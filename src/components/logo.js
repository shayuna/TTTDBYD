import React from "react";
import Helper from "./helper";

const Logo = (props)=>(
    <div style={styles.cursor} className="appLogo" onClick={props.reload}>TenThingsTDbeforeYD</div>
);

const styles = {
    cursor:{
        cursor:"pointer",
    }
}

export default Logo;