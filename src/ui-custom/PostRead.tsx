import { Flex } from "@aws-amplify/ui-react";
import { Post } from "../models"


export type PostReadProps = {
    key?: number,
    post?: Post,
}

export default function PostRead(props: PostReadProps) {
    const { post } = props;

    return (
        <Flex
            key={props.key}
            gap="12px"
            direction="column"
            width="300px"
        >
            <div> { post?.title } </div>
            <div> { post?.content } </div>
            
        </Flex>
    );
}