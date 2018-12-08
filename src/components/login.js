import React,{Component} from "react";
import firebase from "./firebase";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/user";

class Login extends Component {
    constructor(){
        super();
        this.login=this.login.bind(this);
    }
    render(){
        return (
            <article style={styles.main}>
                <h3 style={styles.itm}>login screen</h3>
                <input id="username" type="text" placeholder="username" style={styles.itm}/>
                <input id="pwd" type="password" placeholder="password" style={styles.itm}/>
                <button onClick={this.login} style={styles.itm}>login</button> 
            </article>
        );
    }
    validate(){
        let retVal=true;   
        if (document.getElementById("username").value.trim()===""){
            alert ("you should enter a name, punk");
            document.getElementById("username").focus();
            retVal=false;
        }
        else if (document.getElementById("pwd").value.trim()===""){
            alert ("you should enter a password, punk");
            document.getElementById("pwd").focus();
            retVal=false;
        }
        return retVal;
    }
    login(){
        if (!this.validate())return;
        const database = firebase.database();
        const query=database.ref("users").orderByChild("username").equalTo(document.getElementById("username").value);
        query.once("value")
        .then((snapshot)=>{
            if (snapshot.val() && Object.keys(snapshot.val()).length>0){
                if (snapshot.val()[Object.keys(snapshot.val())].pwd===document.getElementById("pwd").value){
                    const arLikes=!snapshot.val()[Object.keys(snapshot.val())].likes ? [] : Object.keys(snapshot.val()[Object.keys(snapshot.val())].likes).map((oLikeID)=>{
                        return snapshot.val()[Object.keys(snapshot.val())].likes[oLikeID].itemID;
                    });
                    this.props.setUser(document.getElementById("username").value,Object.keys(snapshot.val())[0],arLikes);
                    this.props.switchToMain();
                }
                else{
                    alert ("you got the password wrong");
                    document.getElementById("pwd").focus();
                }
           }
            else{
                alert ("username not recognised");
                document.getElementById("username").focus();
            }
        })
        .catch((err)=>{
            console.log ("error was detected when trying to verify a new user name",err);
        }); 
    }
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
        setUser:(name,id,likes)=>dispatch(setUser(name,id,likes)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default Login;