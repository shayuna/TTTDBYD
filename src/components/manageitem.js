import React,{Component} from "react";
import firebase from "./firebase";
import {connect} from "react-redux";
import {clearItems} from "../redux/actions/items";
import {updateAuthoredInUser} from "../redux/actions/user";

class ManageItem extends Component {
    constructor(){
        super();
        this.addItem=this.addItem.bind(this);
        this.updateItem=this.updateItem.bind(this);
    }
    render(){
        return (
            <article style={styles.main}>
                <h3 className="innerScrnHdr" style={styles.itm}>manage item screen</h3>
                <input id="caption" type="text" className="inputItm" placeholder="title" style={styles.itm} defaultValue={this.props.caption}/>
                <textarea id="description" type="description" className="inputItm" placeholder="description" style={{...styles.itm,...styles.descriptionItm}} defaultValue={this.props.description}></textarea>
                {!this.props.id && <button className="btn" onClick={this.addItem} style={styles.itm}>add</button>} 
                {this.props.id && <button className="btn" onClick={this.updateItem} style={styles.itm}>update</button>} 
            </article>
        );
    }
    validate(){
        let retVal=true;   
        if (document.getElementById("caption").value.trim()===""){
            alert ("you should enter a title, punk");
            document.getElementById("caption").focus();
            retVal=false;
        }
        else if (document.getElementById("description").value.trim()===""){
            alert ("you should enter a description, punk");
            document.getElementById("description").focus();
            retVal=false;
        }
        return retVal;
    }
    updateItem(){
//        alert ("in update last stage. id="+this.props.id);
        const database = firebase.database();
        database.ref("items/"+this.props.id).update({
            caption:document.getElementById("caption").value,
            description:document.getElementById("description").value,
        })
        .then(()=>{
            this.props.clearItems();/*by this we are forcing the itemslist component to update from db*/
            this.props.switchToMain();
        })
        .catch((err)=>{
            console.log("error in updateItem. err is - ",err);
        });
    }
    addItem(){
        if (!this.validate())return;
        const database = firebase.database();
        console.log("adding new item to db");
        var oItm=database.ref("items").push();
        oItm.set({
            caption:document.getElementById("caption").value,
            description:document.getElementById("description").value,
            likes:0,
            username:this.props.user.name,
            userid:this.props.user.id,
        })
        .then(()=>{
            this.props.clearItems();/*by this we are forcing the itemslist component to update from db*/
            this.props.switchToMain();
        })
        .catch((err)=>{
            console.log ("an error was detected in add item. err is - ",err);
        });
        database.ref("users/"+this.props.user.id+"/authored/"+oItm.key).set("1");
        this.props.updateAuthoredInUser(oItm.key,"ADD");
    }
}
const styles={
    main:{
        display:"flex",
        flexDirection:"column",
    },
    itm:{
        width:"20em",
    },
    descriptionItm:{
        height:"20em",
    }
}

const mapStateToProps = (state) => {
    return {
        user:state.user,
        items:state.items,
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearItems:()=>dispatch(clearItems()),
        updateAuthoredInUser:(itemId,operation)=>dispatch(updateAuthoredInUser(itemId,operation)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageItem);
//export default ManageItem;