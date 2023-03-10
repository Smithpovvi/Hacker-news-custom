import {useCallback, useEffect, useState} from "react";
import {HackerNewsDto} from "../types/hackerNewsDto";
import {getComments} from "../api/hackerNewsApi";

interface IUseFetchNews {
    comments?: HackerNewsDto[],
    fetch: () => void,
    loading: boolean
}

function useFetchComments(commentsIds: number[]): IUseFetchNews {
    const [loading, setLoading] = useState(false)
    const [comments, setComments] = useState<HackerNewsDto[] | undefined>()

    const fetch = useCallback(() => {
        setLoading(true)
        getComments(commentsIds).then((commentsResp) => {
            setComments(commentsResp);
            setLoading(false);
        })
    }, [commentsIds])

    useEffect(() => {
        if (commentsIds?.length) {
            fetch()
        }
    }, [commentsIds, fetch])

    return {
        comments,
        loading,
        fetch
    }
}

export default useFetchComments;
