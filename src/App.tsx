import React from 'react';
import { Amplify, API } from 'aws-amplify';
import * as queries from './graphql/queries';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import { Post } from './ui-components';
import '@aws-amplify/ui-react/styles.css';
import { GraphQLResult } from '@aws-amplify/api-graphql';

Amplify.configure(awsExports);


const fetchPosts = async (): Promise<[object[], string]> => {
  const result = await API.graphql({
    query: queries.listPosts,
    variables: { limit: 6 }
  });
  const { data: { listPosts: { items, nextToken }}} = result as GraphQLResult<any>;
  return [items, nextToken];
}


class PostsWrapper extends React.Component<{}, {posts: object[], nextToken: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      posts: [],
      nextToken: "",
    }
  }

  componentDidMount() {
    fetchPosts()
      .then(([items, nextToken]) => {
        this.setState({
          posts: items,
          nextToken: nextToken
        });
      });
  }

  render() {
    const { posts } = this.state;
    if (!posts) return "loading...";
    return posts.map((item, idx) => {
      return (<Post key={idx} post={item} />);
    });
  }
}

export default function App() {
  return (
    <main>
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <h1>Hello {user.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
        
      </Authenticator>
      <PostsWrapper />
    </main>
  );
}
