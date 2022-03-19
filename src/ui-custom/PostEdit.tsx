import { Button, Flex, TextAreaField, TextField } from "@aws-amplify/ui-react";
import { Post } from "../models";

export type PostEditProps = {
    post?: Post,
    onFieldChange: (a: keyof Post, b: string) => void,
    onSave: () => void
}

export default function PostEdit(props: PostEditProps) {

    function handleChange(propName: keyof Post, newValue: string) {
        props.onFieldChange(propName, newValue);
    }

    function handleSave() {
        props.onSave();
    }

    return (
        <Flex
            gap="12px"
            direction="column"
            width="300px"
        >
            <TextField
                defaultValue={props.post?.title}
                label="Title"
                onChange={(e: any) => handleChange("title", e.target.value)}
            />
            <TextAreaField
                defaultValue={props.post?.content}
                label="Content"
                onChange={(e: any) => handleChange("content", e.target.value)}
            />
            <Button
                loadingText="Saving..."
                onClick={handleSave}
            >
                Save
            </Button>
        </Flex>
    );

}