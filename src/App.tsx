import React from 'react';
import { Amplify, DataStore } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { PostCollection } from './ui-custom/PostCollection';

Amplify.configure(awsExports);

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
      <PostCollection />
    </main>
  );
}
