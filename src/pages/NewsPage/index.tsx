import React, {useCallback, useRef} from "react";
import dateConvert from "../../utils/dateConvert";
import {Box, Button, Card, CardBody, CardHeader, Flex, Heading, Progress, Text, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {HackerNewsDto} from "../../types/hackerNewsDto";
import {StarIcon} from "@chakra-ui/icons";

interface NewsPageProps {
    loading: boolean;
    news?: HackerNewsDto[];
    fetchHandler: () => void;
}

const NewsPage: React.FC<NewsPageProps> = ({loading, news, fetchHandler}) => {
    const navigate = useNavigate();
    const stackRef = useRef<HTMLDivElement>(null)

    const upHandler = useCallback(() => stackRef?.current?.scrollIntoView?.({
        behavior: "smooth",
        block: "start"
    }), [stackRef]);

    const openInNewTab = useCallback((url: string) => {
        window.open(url, '_blank')
    }, [])

    const expandItem = useCallback((id: number) => {
        navigate(`/${id}`)
    }, [navigate])

    return (
        <>
            <Progress size='sm' isIndeterminate={loading} position="fixed" width="100%" zIndex="10"/>
            <Button onClick={upHandler} position="fixed" bottom="40px" right="40px"
                    display={{base: "none", lg: "block"}}>Up</Button>
            <VStack py="30px" spacing={8} ref={stackRef}>
                {news && <Button onClick={fetchHandler}>Fetch news</Button>}
                {news?.map((item) => (
                    <Box key={item.id} width={{base: "100%", lg: "720px"}} px={{base: "20px", lg: "0px"}}>
                        <Card>
                            <CardHeader>
                                <Heading size='md' _hover={{color: "blue"}} cursor="pointer"
                                         onClick={() => openInNewTab(item.url)}>{item.title}</Heading>
                            </CardHeader>
                            <CardBody display="flex" flexDirection={{base: "column", lg: "row"}}
                                      justifyContent="space-between" alignItems="center">
                                <Flex alignItems="center" gridGap="10px">
                                    <Text>{item.score}</Text>
                                    <StarIcon/>
                                </Flex>
                                <Text>Created by: {item.by}</Text>
                                <Text>Date: {dateConvert(item.time)}</Text>
                                <Button variant="link" onClick={() => expandItem(item.id)}>Expand</Button>
                            </CardBody>
                        </Card>
                    </Box>
                ))}
            </VStack>
        </>
    );
}

export default NewsPage;
