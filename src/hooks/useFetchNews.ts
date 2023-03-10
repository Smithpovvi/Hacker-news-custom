import {useCallback, useEffect, useState} from "react";
import {getSortedNews} from "../api/hackerNewsApi";
import {HackerNewsDto} from "../types/hackerNewsDto";

interface IUseFetchNews {
    news?: HackerNewsDto[],
    fetch: () => void,
    loading: boolean
}

function useFetchNews(): IUseFetchNews {
    const [news, setNews] = useState<HackerNewsDto[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const fetch = useCallback((): Promise<void> => {
        setLoading(true)
        return getSortedNews().then((sortedNews) => {
            setNews(sortedNews || []);
            setLoading(false)
        });
    }, [])

    useEffect(() => {
        const id = setInterval(() => {
            fetch();
        }, 60000);

        fetch()

        return () => clearInterval(id)
    }, [fetch])

    return {
        news,
        fetch,
        loading
    }
}

export default useFetchNews;
