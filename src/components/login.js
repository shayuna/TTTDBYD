import React,{Component} from "react";
import Button from "./button";
import firebase from "./firebase";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/user";

class Login extends Component {
    constructor(){
        super();
        this.login=this.login.bind(this);
        const myself=this;
        firebase.auth().onAuthStateChanged(function(user,err) {
            if (err)alert (err.message);
            if (user) {
              // User is signed in.
              myself.login_cont();
              console.log ("logged in");
            } else {
              // No user is signed in.
            }
          });
    }
    render(){
        return (
            <article id="eLoginPg" className="main">
                <h3 className="innerScrnHdr">login screen</h3>
                <input id="username" type="text" className="inputItm" placeholder="username"/>
                <input id="pwd" type="password" className="inputItm" placeholder="password"/>
                <button className="btn" onClick={this.login} >login</button> 
                <div className="homeBtnWrapper"><Button caption="Back" activateProperFunctionBoy={this.props.switchToMain}/></div>
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
    login_cont(){
        console.log("logged in to db.user is is - "+firebase.auth().currentUser.uid);
        if (firebase.auth().currentUser){
            const database = firebase.database();
            const query=database.ref("users").child(firebase.auth().currentUser.uid);
            query.once("value")
            .then((snapshot)=>{
                this.props.setUser({id:firebase.auth().currentUser.uid,...snapshot.val()});
                this.props.switchToMain();
            })
            .catch((err)=>{
                console.log ("error was detected when trying to verify a new user name",err);
            }); 
    




        }
    }
    login(){
        if (!this.validate())return;
        const email=document.getElementById("username").value+"12345678@gmail.com";
        const password=document.getElementById("pwd").value;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert (errorMessage);
            // ...
          });
/*
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
*/
    }
}
const styles={
}

const mapStateToProps = (state) => {
    return {
        user:state.user,
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser:(oUser)=>dispatch(setUser(oUser)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default Login;