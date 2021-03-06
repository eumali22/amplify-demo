import { useState } from "react";
import { Post } from "../models";
import { ItemMode } from "./common.types";

type PostComponentProps = {
    idKey: number,
    post: Post,
    mode: ItemMode,
    onFieldChange: (key: number, b: keyof Post, c: string, a: Post) => void,
    onSave: (post: Post) => void
}

function PostComponent(props: PostComponentProps) {
    const [mode, setMode] = useState<ItemMode>(props.mode);

    function handleSave(post: Post) {
        if (props.idKey !== -1) setMode("read");
        props.onSave(post);
    }

    return (
        mode === "read"
            ? <PostRead onDblClick={() => setMode("edit")} post={props.post}></PostRead>
            : <PostEdit idKey={props.idKey} onSave={handleSave} onFieldChange={props.onFieldChange} post={props.post}></PostEdit>
    );
}

type PostReadProps = {
    post: Post,
    onDblClick: () => void,
}

function PostRead(props: PostReadProps) {
    return (
        props.post
        ? <article className='post'>
            <h2>User {props.post.owner} says:</h2>
                <article onDoubleClick={props.onDblClick}>
                <h3>{props.post.title}</h3>
                <p>{props.post.content}</p>
            </article>
        </article>
        : null
    );
}

type PostEditProps = {
    idKey: number,
    post: Post,
    onFieldChange: (key: number, b: keyof Post, c: string, a: Post) => void,
    onSave: (post: Post) => void
}

function PostEdit(props: PostEditProps) {
    function handleChange(idKey: number, prop: keyof Post, newVal: string, post: Post) {
        props.onFieldChange(idKey, prop, newVal, post);
    }

    function handleSave() {
        props.onSave(props.post);
    }

    return (
        <article className='post'>
            {<h2>Write new post:</h2>}
            <article>
                <input
                    className="fld-title"
                    type="text"
                    value={props.post.title}
                    onChange={(e: any) => handleChange(props.idKey, "title", e.target.value, props.post)}
                />
                <textarea
                    className="fld-content"
                    value={props.post.content}
                    onChange={(e: any) => handleChange(props.idKey, "content", e.target.value, props.post)}
                />
            </article>
            <div>
                <button type="button" onClick={handleSave}>Save</button>
            </div>
        </article>
    );
}

export default PostComponent;