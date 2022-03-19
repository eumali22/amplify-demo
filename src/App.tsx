import { Amplify, DataStore } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { PostCollection } from './ui-custom/PostCollection';
import { Post } from './models';
Amplify.configure(awsExports);

export default function App() {
    return (
        <>
        <section id="profile">
            <Authenticator>
                {({ signOut, user }) => (
                    <>
                        <h5>UserID: {user.username}</h5>
                        <button className="btn-sout" onClick={() => logOut(signOut)}>Sign out</button>
                    </>
                )}
            </Authenticator>
        </section>
        <main>
            <PostCollection />
        </main>
        </>
    );
}

function logOut(signoutCallback: () => void) {
    DataStore.clear();
    signoutCallback();
}