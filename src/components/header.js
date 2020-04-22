import React from "react";
import Logo from "./logo";
import Button from "./button";
import Helper from "./helper";

const Header = (props)=>(
    <div className="appHdr">
        <Logo reload={props.reload}/> 
        <div className="menu">
            {props.user && 
            <div id="eProfileMenuWrapper">
                <div id="eProfileMenuBtn" onClick={Helper.toggleProfileMenuState}>hi {props.user}</div>
                <ul id="eProfileMenu" className="hideMe">
                    <li className="itm" onClick={Helper.reload} >Sign out</li>
                </ul>
            </div>
            } 
            <Button caption="About" activateProperFunctionBoy={props.about}/>
            {!props.user && <Button caption="Login" activateProperFunctionBoy={props.login}/> }
            {!props.user && <Button caption="Register" activateProperFunctionBoy={props.register}/>}
            {props.user && props.isMyPage && <Button caption="Copy_Url" activateProperFunctionBoy={props.getPageLink} textOnHover={"copy url of YOUR TTD list to clipboard, to use anywhere."}/>}
            {props.user && !props.isMyPage && <Button caption="MyPage" activateProperFunctionBoy={props.openMyPage}/>}
            {props.user && <Button withBorder="1" caption="+" activateProperFunctionBoy={props.add}/>}
        </div>
    </div>
)
export default Header;