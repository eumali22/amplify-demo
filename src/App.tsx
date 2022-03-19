import React from 'react';
import { Amplify, DataStore, syncExpression } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { PostCollection } from './ui-custom/PostCollection';
import PostWrapper from './ui-custom/PostWrapper';

Amplify.configure(awsExports);

export default function App() {
  function logOut(signoutCallback: ()=>void) {
    DataStore.clear();
    signoutCallback();
  }

  return (
    <main>
      <Authenticator>
        {({ signOut, user }) => (
          <>
            <div>
              <h1>Hello {user.username}</h1>
              <button onClick={() => logOut(signOut)}>Sign out</button>
            </div>
            <PostWrapper mode="edit" />
            
          </>
        )}
      </Authenticator>
      
    </main>
  );
}
