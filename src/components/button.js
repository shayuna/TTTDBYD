import React,{Component} from "react";

class Button extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="btnElmWrapper" style={{...styles.button,...(parseInt(this.props.withBorder,10)===1 ? styles.withBorder : {})}} onClick={this.props.activateProperFunctionBoy} title={this.props.textOnHover}>
               <div> {this.props.caption}</div>
            </div>
        )
    }
}

const styles = {
    button:{
        fontSize:"1em",
        margin:"0.5em",
        cursor:"pointer"
    },
    withBorder:{
        padding:"0.5em",
        border:"1px solid black"
    }
}
export default Button;