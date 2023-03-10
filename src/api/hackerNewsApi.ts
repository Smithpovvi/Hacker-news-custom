import axios from "axios";
import {HackerNewsDto} from "../types/hackerNewsDto";

export const getNewsIds = async (): Promise<number[]> => (await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json"))?.data

export const getItemById = async (id: number): Promise<HackerNewsDto> => (await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))?.data

export const getSortedNews = async (count = 100): Promise<HackerNewsDto[]> => {
    return getNewsIds().then((ids) => {
        const sortedIds = ids.slice(0, count);
        const promiseArray = sortedIds.map((id) => (getItemById(id)));
        return Promise.all(promiseArray).then((newsResp) => newsResp.sort((a, b) => a.time - (b.time)).reverse())
    })
}

export const getComments = async (ids: number[]): Promise<HackerNewsDto[]> => {
    const promiseArray = ids.map((id) => (getItemById(id)))
    return Promise.all(promiseArray)
}
