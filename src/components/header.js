import React from "react";
import Logo from "./logo";
import Button from "./button";

const Header = (props)=>(
    <div className="appHdr">
        <Logo/> 
        {!props.user && <Button caption="Login" activateProperFunctionBoy={props.login}/> }
        {!props.user && <Button caption="Register" activateProperFunctionBoy={props.register}/>}
        {props.user && <article>{"hi "+props.user}</article>} 
        {props.user && <Button withBorder="1" caption="+" activateProperFunctionBoy={props.add}/>}
    </div>
)

export default Header;