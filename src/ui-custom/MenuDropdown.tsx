import React, { useState } from "react";
import useOnClickOutside from 'use-onclickoutside';

type MenuDropdownProps = {
    children: object,
    label: string
}

function MenuDropdown(props: MenuDropdownProps) {
    const [show, setShow] = useState(false);
    const toggleShow = () => {
        setShow(!show);
    }

    return (
        
        <div className="dropdown" onClick={toggleShow}>
            <span>{props.label}</span>
            {show && <MenuDropdownContent closeFn={toggleShow}>{props.children}</MenuDropdownContent>}
        </div>
    );
}

function MenuDropdownContent(props: { children: object, closeFn: ()=>void}) {
    const ref = React.useRef(null);
    useOnClickOutside(ref, props.closeFn);

    return (
        <div ref={ref} className="dropdown-content">
            {props.children}
        </div>
    );
}

export default MenuDropdown;