import { Authenticator } from "@aws-amplify/ui-react";

function ProfileSection() {
    return (
        <section id="profile">
            <Authenticator>
                {({ signOut, user }) => (
                    <>
                        <h5>UserID: {user.username}</h5>
                        <button className="btn-sout" onClick={() => signOut}>Sign out</button>
                    </>
                )}
            </Authenticator>
        </section>
    );
}

export default ProfileSection;