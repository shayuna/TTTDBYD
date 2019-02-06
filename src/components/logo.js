import React from "react";
import Helper from "./helper";

const Logo = ()=>(
    <div style={styles.cursor} className="appLogo" onClick={()=>Helper.reload()}>TenThingsTDbeforeYD</div>
);

const styles = {
    cursor:{
        cursor:"pointer",
    }
}

export default Logo;