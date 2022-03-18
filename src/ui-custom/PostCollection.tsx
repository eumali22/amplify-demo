import React from "react";
import * as queries from '../graphql/queries';
import { API, DataStore } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Post } from '../models/index';
import PostRead from '../ui-components/PostRead'

const fetchPosts = async (): Promise<[object[], string]> => {
    const result = await API.graphql({
        query: queries.listPosts,
        variables: { limit: 6 }
    });
    const { data: { listPosts: { items, nextToken } } } = result as GraphQLResult<any>;
    return [items, nextToken];
}

const fetchPosts2 = async (): Promise<[object[], string]> => {
    try {
        await DataStore.start();
        const posts = await DataStore.query(Post);
        // console.log("Posts retrieved successfully!", JSON.stringify(posts, null, 2));
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
        // fetchPosts()
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
            return (<PostRead key={idx} post={item} />);
        });
    }
}