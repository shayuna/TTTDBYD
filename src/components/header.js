import React from "react";
import Logo from "./logo";
import Button from "./button";

const Header = (props)=>(
    <div style={styles.header}>
        <Logo/> 
        {!props.user && <Button caption="Login" activateProperFunctionBoy={props.login}/> }
        {!props.user && <Button caption="Register" activateProperFunctionBoy={props.register}/>}
        {props.user && <article>{"hi "+props.user}</article>} 
        {props.user && <Button withBorder="1" caption="+" activateProperFunctionBoy={props.add}/>}
    </div>
)

const styles = {
    header:{
        display:"flex",
        alignItems:"center",
    },
}

export default Header;