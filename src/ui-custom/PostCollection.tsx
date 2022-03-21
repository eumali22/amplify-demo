import React, { useEffect, useState } from "react";
import * as queries from '../graphql/queries';
import { API, DataStore, Hub, Predicates, SortDirection } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Post } from '../models/index';
import PostWrapper from "./PostWrapper";
import PostComponent from "./PostComponent";

const fetchPosts = async (): Promise<[object[], string]> => {
    const result = await API.graphql({
        query: queries.listPosts,
        variables: { limit: 6 }
    });
    const { data: { listPosts: { items, nextToken } } } = result as GraphQLResult<any>;
    return [items, nextToken];
}

const initDataStore = async () => {
    await DataStore.start();
}

const fetchPosts2 = async (): Promise<[object[], string]> => {
    try {
        const posts = await DataStore.query(Post);
        console.log("Posts retrieved successfully!", JSON.stringify(posts, null, 2));
        return [posts, ""];
    } catch (error) {
        console.log("Error retrieving posts", error);
        return [[], ""];
    }
}

export class PostCollection extends React.Component<{}, { posts: object[], nextToken: string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            posts: [],
            nextToken: "",
        }
    }

    componentDidMount() {
        initDataStore();
        fetchPosts2()
          .then(([items, nextToken]) => {
            this.setState({
              posts: items,
              nextToken: nextToken
            });
          })
    }

    render() {
        const { posts } = this.state;
        if (!posts) return "loading...";
        return posts.map((item, idx) => {
            return (<PostWrapper mode="read" key={idx} item={item as Post} />);
        });
    }
}

export function PCollection() {
    const [newPost, setNewPost] = useState<Post>(new Post({}));
    const [posts, setPosts] = useState<Post[]>([]);
    
    function handleFieldChange(key: number, prop: keyof Post, newValue: string, post?: Post) {
        if (!post) {
            post = new Post({});
        }
        const updatedPost = Post.copyOf(post!, updated => {
            updated.title = prop === "title" ? newValue : post!.title;
            updated.content = prop === "content" ? newValue : post!.content;
        });
        const newPostsArr = [...posts];
        if (key === -1) {
            setNewPost(updatedPost);
        } else {
            newPostsArr[key] = updatedPost;
            setPosts(newPostsArr);
        }
    }

    async function handleSave(post: Post) {
        try {
            const savedPost = await DataStore.save(post);
            if (post == newPost) {
                setNewPost(new Post({ title: "", content: "" }));
            }
        } catch (e) {
            console.error("error saving Post!");
        }
    }

    useEffect(() => {
        console.log("DataStore.start()");
        const startDataStore = async () => {
            await DataStore.start();
        }
        startDataStore();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await DataStore.query(Post, Predicates.ALL, {
                    sort: s => s.updatedAt(SortDirection.DESCENDING)
                });
                console.log("Posts retrieved successfully!");
                setPosts(posts);
            } catch (error) {
                console.log("Error retrieving posts: ", error);
            }
        }

        // Create listener
        const listener = Hub.listen("datastore", async hubData => {
            const { event, data } = hubData.payload;
            if (event === "ready") {
                // do something here once the data is synced from the cloud
                console.log("READDYYY");
                fetchData();
            }
        });
        console.log("ATTACHING READY LISTENER");

        // // Remove listener
        return () => {
            console.log("REMOVING READY LISTENER");
            listener();
        }

    }, [posts]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await DataStore.query(Post, Predicates.ALL, {
                    sort: s => s.updatedAt(SortDirection.DESCENDING)
                });
                console.log("Posts retrieved successfully!");
                setPosts(posts);
            } catch (error) {
                console.log("Error retrieving posts: ", error);
            }
        }

        const subscription = DataStore.observe(Post).subscribe(msg => {
            fetchData();
            console.log(msg.model, msg.opType, msg.element);
        });
        console.log("ATTACHING POST LISTENER");

        return () => {
            console.log("REMOVING POST LISTENER");
            subscription.unsubscribe();
        }
    });

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

