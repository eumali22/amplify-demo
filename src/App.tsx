import { Amplify, DataStore } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { PostCollection } from './ui-custom/PostCollection';
import { Post } from './models';
import MenuBar from './ui-custom/MenuBar';
Amplify.configure(awsExports);

export default function App() {
    // return (
    //     <>
    //     <section id="profile">
    //         <Authenticator>
    //             {({ signOut, user }) => (
    //                 <>
    //                     <h5>UserID: {user.username}</h5>
    //                     <button className="btn-sout" onClick={() => logOut(signOut)}>Sign out</button>
    //                 </>
    //             )}
    //         </Authenticator>
    //     </section>
    //     <main>
    //         <PostCollection />
    //     </main>
    //     </>
    // );

    return (
        <Authenticator>
            {({ signOut, user }) => (
                <>
                    <MenuBar signOut={signOut}/>
                    <main>
                        <p>hi there this is some sample text. and more words are coming. aljadf ubiaolall jasf,</p>
                        <p>lorem ipsum dolor sit amet hallelujah</p>
                        <p>hi there this is some sample text. and more words are coming. aljadf ubiaolall jasf,</p>
                        <p>lorem ipsum dolor sit amet hallelujah</p>
                        <p>hi there this is some sample text. and more words are coming. aljadf ubiaolall jasf,</p>
                        <p>lorem ipsum dolor sit amet hallelujah</p>
                        <p>hi there this is some sample text. and more words are coming. aljadf ubiaolall jasf,</p>
                        <p>lorem ipsum dolor sit amet hallelujah</p>
                        <p>hi there this is some sample text. and more words are coming. aljadf ubiaolall jasf,</p>
                        <p>lorem ipsum dolor sit amet hallelujah</p>
                        <p>hi there this is some sample text. and more words are coming. aljadf ubiaolall jasf,</p>
                        <p>lorem ipsum dolor sit amet hallelujah</p>
                        <p>hi there this is some sample text. and more words are coming. aljadf ubiaolall jasf,</p>
                        <p>lorem ipsum dolor sit amet hallelujah</p>
                    </main>
                </>
            )}
        </Authenticator>
    )
}

function logOut(signoutCallback: () => void) {
    DataStore.clear();
    signoutCallback();
}