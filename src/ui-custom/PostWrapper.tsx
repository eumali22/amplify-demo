import { Post as PostModel } from "../models";
import { ItemMode } from "./common.types";
import PostEdit from "./PostEdit";
import React from "react";
import { DataStore } from "aws-amplify";
import PostRead from "./PostRead";
import ActionButtons from "./ActionButtons";


export type PostWrapperProps = { mode: ItemMode, item?: PostModel };

/**
 * Post model state lives here
 */
export default class PostWrapper extends React.Component<PostWrapperProps, PostWrapperProps> {
    constructor(props: PostWrapperProps) {
        super(props);

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        
        this.state = {
            mode: props.mode,
            item: props.item || new PostModel({})
        }
    }

    handleFieldChange(prop: keyof PostModel, newValue: string) {
        const { item } = this.state;

        const newPost = PostModel.copyOf(item!, updated => {
            updated.title = prop === "title" ? newValue : item!.title;
            updated.content = prop === "content" ? newValue : item!.content;
        });
        
        this.setState({
            item: newPost
        });
    }

    async handleSave() {
        const newPost = await DataStore.save(this.state.item as PostModel);
        this.setState({
            mode: "read",
            item: newPost
        })
    }

    handleEdit() {
        this.setState({ mode: "edit" });
    }

    renderPostEdit() {
        return (
            <PostEdit
                key={this.state.item?.id}
                post={this.state.item}
                onFieldChange={this.handleFieldChange}
                onSave={this.handleSave}
            />
        );
    }

    render() {
        const postComponent = this.state.mode === "edit"
            ? this.renderPostEdit()
            : <PostRead post={this.state.item} />

        return (
            <>
                <ActionButtons 
                    mode={this.state.mode}
                    onEdit={this.handleEdit}
                    onSave={this.handleSave}
                />
                { postComponent }
            </>
        );
    }
}