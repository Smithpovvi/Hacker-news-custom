import {Box, Button, Flex, Heading, Text} from "@chakra-ui/react";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {getItemById} from "../../api/hackerNewsApi";
import {HackerNewsDto} from "../../types/hackerNewsDto";
import dateConvert from "../../utils/dateConvert";
import AccordionComments from "../../components/AccordionComments";

const OverviewPage: React.FC = () => {
    const location = useLocation();
    const itemId = Number(location.pathname.split('/')[1])
    const [item, setItem] = useState<HackerNewsDto | undefined>()
    const [fetchComments, setFetchComments] = useState(false)
    const navigate = useNavigate();
    const elementRef = useRef<HTMLDivElement>(null)

    const openInNewTab = useCallback((url: string) => {
        window.open(url, '_blank')
    }, [])

    const goBack = useCallback(() => {
        navigate(`/`)
    }, [navigate])

    const upHandler = useCallback(() => elementRef?.current?.scrollIntoView?.({
        behavior: "smooth",
        block: "start"
    }), [elementRef]);

    const updateCommentsHandler = useCallback(() => {
        setFetchComments(true)
        setTimeout(() => {
            setFetchComments(false)
        }, 0)
    }, []);

    useEffect(() => {
        if (itemId) {
            getItemById(itemId).then((itemResp) => {
                setItem(itemResp);
            })
        }
    }, [itemId])

    return (
        <>
            <Button onClick={upHandler} position="fixed" bottom="40px" right="40px"
                    display={{base: "none", lg: "block"}}>Up</Button>
            <Flex flexDirection="column" gridGap="50px" width={{base: "100%", lg: "720px"}} mx="auto"
                  py="50px" ref={elementRef} px={{base: "20px", lg: "0px"}}>
                <Button onClick={goBack} width="100px">Back</Button>
                {!!item && (
                    <Flex flexDirection="column" gridGap="20px">
                        <Heading size='md' _hover={{color: "blue"}} cursor="pointer"
                                 onClick={() => openInNewTab(item.url)}>{item.title}</Heading>
                        <Flex justifyContent="space-between" flexDirection={{base: "column", lg: "row"}}>
                            <Text>Score: {item.score}</Text>
                            <Text>Created by: {item.by}</Text>
                            <Text>Date: {dateConvert(item.time)}</Text>
                        </Flex>
                        {item.text?.length ? (<Box dangerouslySetInnerHTML={{__html: item.text}}/>) : (
                            <Text>Description doesn't exist. Let's read on parent web site</Text>
                        )}
                        <Flex justifyContent="space-between" alignItems="center">
                            <Heading size='sm'>Comments({item.descendants || 0}): </Heading>
                            <Button variant="link" onClick={updateCommentsHandler}>Fetch comments</Button>
                        </Flex>
                        {item.kids && (
                            <AccordionComments commentsIds={item.kids} fetchComments={fetchComments}/>
                        )}
                    </Flex>
                )}
            </Flex>
        </>
    );
}

export default OverviewPage;
