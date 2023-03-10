import React, {useEffect} from "react";
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Spinner,
    Text
} from "@chakra-ui/react";
import dateConvert from "../../utils/dateConvert";
import useFetchComments from "../../hooks/useFetchComments";

interface AccordionCommentsProps {
    commentsIds: number[];
    fetchComments?: boolean;
}

const AccordionComments: React.FC<AccordionCommentsProps> = ({commentsIds, fetchComments}) => {
    const {loading, comments, fetch} = useFetchComments(commentsIds);

    useEffect(() => {
        if (fetchComments) {
            fetch()
        }
    }, [fetchComments, fetch])

    return (
        <>
            {loading && (
                <Spinner size='md' mx="auto"/>
            )}
            <Accordion allowMultiple>
                {
                    comments?.length ? comments.map((commentItem) => (
                        <AccordionItem key={commentItem.id}>
                            {({isExpanded}: { isExpanded: boolean }) => (
                                <>
                                    <h2>
                                        <AccordionButton disabled={!commentItem.kids?.length}>
                                            <Flex flexDirection="column" gridGap="10px" alignItems='start' width="100%">
                                                {commentItem.text?.length ? (<Box as="span" flex='1' textAlign='left'
                                                                                  dangerouslySetInnerHTML={{__html: commentItem.text}}/>) : (
                                                    <Text>Comment text doesn't exist</Text>
                                                )}
                                                <Flex justifyContent="space-between" width="100%">
                                                    <Text>Comment added by: {commentItem.by}</Text>
                                                    <Text>Date: {dateConvert(commentItem.time)}</Text>
                                                </Flex>
                                            </Flex>
                                            {commentItem.kids?.length && <AccordionIcon/>}
                                        </AccordionButton>
                                    </h2>
                                    {commentItem.kids?.length && <AccordionPanel pb={4}>
                                        {isExpanded && <AccordionComments commentsIds={commentItem.kids}/>}
                                    </AccordionPanel>}
                                </>
                            )}
                        </AccordionItem>
                    )) : <></>
                }
            </Accordion>
        </>
    );
}

export default AccordionComments;
