import { Amplify, DataStore } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { PCollection, PostCollection } from './ui-custom/PostCollection';
import { Post } from './models';
import MenuBar from './ui-custom/MenuBar';
import { Hub } from '@aws-amplify/core';


Amplify.configure(awsExports);

Hub.listen("datastore", (data) => {
    console.log('A new event has happened:', data);
})

export default function App() {

    return (
        <Authenticator>
            {({ signOut, user }) => (
                <>
                    <MenuBar signOut={()=>logOut(signOut)}/>
                    {/* <main className='all-posts'>
                        <h1>All Posts</h1>
                        <article className='post'>
                            <h2>UserID (post owner)</h2>
                            Hello there asdfas f
                        </article>
                        <article className='post'>
                            <h2>UserID (post owner)</h2>
                            Hiii Hello thereasdfaafa 
                        </article>
                        <article className='post'>
                            <h2>UserID (post owner)</h2>
                            Hello there asd a 
                        </article>
                        <article className='post'>
                            <h2>UserID (post owner)</h2>
                            Helasd fasdf alo thereas  asfasd
                        </article>
                    </main> */}
                    <PCollection />
                </>
            )}
        </Authenticator>
    )
}

function logOut(signoutCallback: () => void) {
    DataStore.clear();
    signoutCallback();
}