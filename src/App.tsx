import { Amplify, DataStore } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { PostCollection } from './ui-custom/PostCollection';
import MenuBar from './ui-custom/MenuBar';
import { Hub } from '@aws-amplify/core';


Amplify.configure(awsExports);

console.log("Listening to all datastore events...");
Hub.listen("datastore", (data) => {
    console.log('A new event has happened:', data);
})

export default function App() {
    return (
        <Authenticator>
            {({ signOut, user }) => {
                return (
                    <>
                        <MenuBar
                            signOut={()=>logOut(signOut)}
                            userName={user.username}
                            userEmail={user.attributes?.email}
                        />
                        <PostCollection />
                    </>
                )
            }}
        </Authenticator>
    )
}

function logOut(signoutCallback: () => void) {
    DataStore.clear();
    signoutCallback();
}