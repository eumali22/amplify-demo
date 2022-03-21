import { useEffect, useState } from "react";
import { DataStore, Hub, Predicates, SortDirection } from 'aws-amplify';
import { Post } from '../models/index';
import PostComponent from "./PostComponent";

export function PostCollection() {
    const [newPost, setNewPost] = useState<Post>(new Post({title: "", content: ""}));
    const [posts, setPosts] = useState<Post[]>([]);
    
    function handleFieldChange(key: number, prop: keyof Post, newValue: string, post: Post) {
        if (!post) {
            post = new Post({ title: "", content: ""});
        }
        const updatedPost = Post.copyOf(post, updated => {
            updated.title = prop === "title" ? newValue : post.title;
            updated.content = prop === "content" ? newValue : post.content;
        });
        
        if (key === -1) {
            setNewPost(updatedPost);
        } else {
            const newPostsArr = [...posts];
            newPostsArr[key] = updatedPost;
            setPosts(newPostsArr);
        }
    }

    async function handleSave(post: Post) {
        // validate fields first
        if (!post.title || post.title.trim() === "") {
            alert("Please provide title!");
            return false;
        }
        if (!post.content || post.content.trim() === "") {
            alert("Please provide content!");
            return false;
        }

        try {
            await DataStore.save(post);
            if (post === newPost) {
                setNewPost(new Post({ title: "", content: "" }));
            }
        } catch (e) {
            console.error("error saving Post!");
        }
    }

    const fetchData = async () => {
        try {
            const posts = await DataStore.query(Post, Predicates.ALL, {
                sort: s => s.updatedAt(SortDirection.DESCENDING)
            });
            console.log("Retrieved posts.")
            setPosts(posts);
        } catch (error) {
            console.log("Error retrieving posts: ", error);
        }
    }

    useEffect(() => {
        const startDataStore = async () => {
            await DataStore.start();
        }
        startDataStore();
        fetchData();
    }, []);

    useEffect(() => {
        const listener = Hub.listen("datastore", async hubData => {
            const { event } = hubData.payload;
            if (event === "ready") {
                fetchData();
            }
        });
        return () => { listener(); }

    }, [posts]);
    
    useEffect(() => {
        const subscription = DataStore.observe(Post).subscribe(msg => {
            fetchData();
        });
        return () => { subscription.unsubscribe(); }
    }, [posts]);

    return (
        <main>
            <h1>All Posts</h1>
            <PostComponent
                key={-1}
                idKey={-1}
                mode={"edit"}
                onFieldChange={handleFieldChange}
                onSave={handleSave}
                post={newPost}
            />
            {posts.map((item, idx) => {
                return (
                    <PostComponent
                        key={idx}
                        idKey={idx}                        
                        mode={"read"}
                        onFieldChange={handleFieldChange}
                        onSave={handleSave}
                        post={item as Post}
                    />
                );
            })}
        </main>
    );
}

