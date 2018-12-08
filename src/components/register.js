import React,{Component} from "react";
import firebase from "./firebase";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/user";
class Register extends Component {
    constructor(){
        super();
        this.register=this.register.bind(this);
    }
    render(){
        return (
            <article style={styles.main}>
                <h3 style={styles.itm}>register screen</h3>
                <input id="username" type="text" placeholder="enter a username" style={styles.itm} autoFocus/>
                <input id="pwd" type="password" placeholder="enter password" style={styles.itm}/>
                <input id="pwd2" type="password" placeholder="verify password" style={styles.itm}/>
                <button onClick={this.register} style={styles.itm}>register</button> 
            </article>
        );
    }
    validate(){
        let retVal=true;   
        if (document.getElementById("username").value.trim()===""){
            alert ("you should have a new name, punk");
            document.getElementById("username").focus();
            retVal=false;
        }
        else if (document.getElementById("pwd").value.trim()===""){
            alert ("you should have a password, punk");
            document.getElementById("pwd").focus();
            retVal=false;
        }
        else if (document.getElementById("pwd").value.trim()!==document.getElementById("pwd2").value.trim()){
            alert ("there is no correspondence between the two passwords, punk");
            document.getElementById("pwd").focus();
            retVal=false;
        }
        return retVal;
    }
    register(){
        if (!this.validate())return;
        const database = firebase.database();
        const query=database.ref("users").orderByChild("username").equalTo(document.getElementById("username").value);
        query.once("value")
        .then((snapshot)=>{
            if (snapshot.val() && Object.keys(snapshot.val()).length>0){
                alert ("try another name. this one is already in the system")
                document.getElementById("username").focus();
            }
            else{
                this.register_cont();
            }
        })
        .catch((err)=>{
            console.log ("error was detected when trying to verify a new user name",err);
        }); 
    }
    register_cont(){
        const database = firebase.database();
       console.log("adding new user to db");
        database.ref("users")
        .push({
            username:document.getElementById("username").value,
            pwd:document.getElementById("pwd").value,
        })
        .then((oKey)=>{
            this.props.setUser(document.getElementById("username").value,oKey.key);
            this.props.switchToMain();
        })
        .catch((err)=>{
            console.log ("an error was detected. err is - ",err);
        })
    }
/*
    componentWillReceiveProps(newProps){
        alert (newProps.user);
    }
*/
}
const styles={
    main:{
        display:"flex",
        flexDirection:"column",
    },
    itm:{
        width:"10em",
        margin:"0.5em auto",
        lineHeight:"1.5",
        textAlign:"center"
    },
}

const mapStateToProps = (state) => {
    return {
        user:state.user,
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser:(name,id)=>dispatch(setUser(name,id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
//export default Register;