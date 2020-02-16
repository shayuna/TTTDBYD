import React from "react";
import Logo from "./logo";
import Button from "./button";

const Header = (props)=>(
    <div className="appHdr">
        <Logo/> 
        <div className="menu">
            {props.user && <article className="greetings">{"hi "+props.user}</article>} 
            <Button caption="About" activateProperFunctionBoy={props.about}/>
            {!props.user && <Button caption="Login" activateProperFunctionBoy={props.login}/> }
            {!props.user && <Button caption="Register" activateProperFunctionBoy={props.register}/>}
            {props.user && <Button caption="Page Link" activateProperFunctionBoy={props.getPageLink} textOnHover={"copy YOUR 'things to do list' url to clipboard"}/>}
            {props.user && <Button withBorder="1" caption="+" activateProperFunctionBoy={props.add}/>}
        </div>
    </div>
)

export default Header;