import React,{Component} from "react";
import Button from "./button";
import firebase from "./firebase";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/user";
class Register extends Component {
    constructor(){
        super();
        this.register=this.register.bind(this);
        this.isNameUnique=this.isNameUnique.bind(this);
        this.usernameRef=React.createRef();
        this.passwordRef=React.createRef();
        const myself=this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              myself.register_cont();
              console.log ("registered");
            } else {
              // No user is signed in.
            }
          });
    }
    render(){
        return (
            <article id="eRegisterPg" className="main">
                <h3 className="innerScrnHdr">register screen</h3>
                <input id="username" type="text" className="inputItm" placeholder="enter a username" autoFocus ref={this.usernameRef} onBlur={this.isNameUnique}/>
                <input id="pwd" type="password" className="inputItm" placeholder="enter password" ref={this.passwordRef}/>
                <input id="pwd2" type="password" className="inputItm" placeholder="verify password"/>
                <button className="btn" onClick={this.register}>register</button> 
                <div className="homeBtnWrapper"><Button caption="Back" activateProperFunctionBoy={this.props.switchToMain}/></div>
            </article>
        );
    }
    isNameUnique(){
        const database = firebase.database();
        const query=database.ref("users").orderByChild("username").equalTo(this.usernameRef.current.value)
        .once("value",snapshot=>{
            if (snapshot.exists()){
                alert ("the name you chose is in use. please choose another name");
                this.usernameRef.current.focus();
                this.usernameRef.current.value="";
                // found
            }
            else{
                // not found
            }
        });
    }
    validate(){
        let retVal=true;   
        if (this.usernameRef.current.value.trim()===""){
            alert ("you should have a new name, punk");
            this.usernameRef.current.focus();
            retVal=false;
        }
        else if (this.passwordRef.current.value.trim()===""){
            alert ("you should have a password, punk");
            this.passwordRef.current.focus();
            retVal=false;
        }
        else if (this.passwordRef.current.value.trim()!==document.getElementById("pwd2").value.trim()){
            alert ("there is no correspondence between the two passwords, punk");
            this.passwordRef.current.focus();
            retVal=false;
        }
        return retVal;
    }
    register(){
        if (!this.validate())return;
/*
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
  */
        const email=this.usernameRef.current.value+"12345678@gmail.com";
        const password=this.passwordRef.current.value;



        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert (errorMessage);
            // ...
        });


  
 
    }
    register_cont(){
       console.log("adding new user to db.user is is - "+firebase.auth().currentUser.uid);
       const database = firebase.database();
       database.ref("users").child(firebase.auth().currentUser.uid).set({
            username:this.usernameRef.current.value,
        })
        .then(()=>{
            this.props.setUser({id:firebase.auth().currentUser.uid,username:this.usernameRef.current.value});
            this.props.switchToMain();
        })
        .catch((err)=>{
            console.log ("err in regiter_cont. err is - "+err.message);
        });
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
//export default Register;