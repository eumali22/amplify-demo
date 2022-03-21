
type MenuItemProps = {
    textOnly: boolean,
    label?: string,
    children?: object
}

function MenuItem(props: MenuItemProps) {
    return (
        <div>
            {props.textOnly && (props.label || "MenuItem")}
            {!props.textOnly && props.children}
        </div>
    )
}

export default MenuItem;