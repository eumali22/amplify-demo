import React from 'react';
import { Amplify, API } from 'aws-amplify';
import * as queries from './graphql/queries';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import { Post } from './ui-components';

import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

const fetchPosts = async () => {
  // Simple query
  // const allPosts = await API.graphql({ query: queries.listPosts });
  const { data: { listPosts: { items: itemsPage1, nextToken } } } = await API.graphql({ query: queries.listPosts, variables: { limit: 6, /* add filter as needed */ } });

  // console.log(itemsPage1); // result: { "data": { "listTodos": { "items": [/* ..... */] } } }
  return itemsPage1;
}

class PostsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: null }
  }

  componentDidMount() {
    fetchPosts()
      .then((items) => {
        this.setState({
          posts: items
        })
      });
  }

  render() {
    const { posts } = this.state;
    if (!posts) return "loading...";
    const postComponents = posts.map((item, idx) => {
      return (<Post key={idx} post={item} />);
    });
    return postComponents;
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
