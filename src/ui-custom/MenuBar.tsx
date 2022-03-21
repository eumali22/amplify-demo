import {Amplify} from "aws-amplify";
import MenuDropdown from "./MenuDropdown";
import MenuItem from "./MenuItem";


function MenuBar(props: {signOut: ()=>void, userName?: string, userEmail?: string}) {
    
    // Amplify.Auth.currentSession().then((res: any) => {
    //     let accessToken = res.getAccessToken()
    //     //let jwt = accessToken.getJwtToken()
    //     //You can print them to see the full objects
    //     console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
    //     //console.log(`myJwt: ${jwt}`)
    // });
    
    return (
        <nav className="noselect">
            <ul>
                <li>
                    <MenuItem textOnly={true} label={"Posts"}></MenuItem>
                </li>
                <li>
                    <MenuDropdown label={props.userEmail || "Profile"}>
                        <ul>
                            <li>Edit my Profile</li>
                            <li><span onClick={props.signOut}>Signout</span></li>
                        </ul>
                    </MenuDropdown>
                </li>
            </ul>
        </nav>
    );
}


export default MenuBar;