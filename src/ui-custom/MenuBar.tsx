import MenuDropdown from "./MenuDropdown";
import MenuItem from "./MenuItem";

function MenuBar(props: {signOut: ()=>void}) {
    return (
        <nav className="noselect">
            <ul>
                <li>
                    <MenuItem textOnly={true} label={"Posts"}></MenuItem>
                </li>
                <li>
                    <MenuDropdown label="Profile">
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