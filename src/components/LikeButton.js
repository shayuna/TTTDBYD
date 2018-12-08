import React,{Component} from "react";

const ButtonLike = (props)=>(
    <div className="likeBtn">
        <div className="caption">{props.caption}</div><div className={props.isItmInLikes ? "likeFull" : "likeEmpty"} onClick={()=>props.updateLikes(props.itmID,props.caption)}></div>
    </div>
)

export default ButtonLike;