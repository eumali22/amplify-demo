import React from 'react';
import { Amplify, DataStore, syncExpression } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { PostCollection } from './ui-custom/PostCollection';
import PostEdit from './ui-custom/PostEdit';
import PostWrapper from './ui-custom/PostWrapper';
import { Post } from './models';


Amplify.configure(awsExports);

DataStore.configure({
  fullSyncInterval: 100
});

export default function App() {

  function logout(signoutCallback: ()=>void) {
    DataStore.stop();
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
              <button onClick={() => logout(signOut)}>Sign out</button>
            </div>
            <PostWrapper mode="edit" />
            <PostCollection />
          </>
        )}
      </Authenticator>
      
    </main>
  );
}
