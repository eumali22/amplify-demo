import { PostRead } from "../ui-components";
import { Post as PostModel } from "../models";
import { ItemMode } from "./common.types";
import PostEdit from "./PostEdit";
import React from "react";
import { DataStore } from "aws-amplify";

export type PostWrapperProps = { mode: ItemMode, item?: PostModel };

export default class PostWrapper extends React.Component<PostWrapperProps, PostWrapperProps> {
    constructor(props: PostWrapperProps) {
        super(props);

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        // this.
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
            item: new PostModel({})
        })
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
        return (
            this.state.mode === "edit"
                ? this.renderPostEdit()
                : <PostRead post={this.state.item} />
        );
    }
}