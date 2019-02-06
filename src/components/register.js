import React,{Component} from "react";
import firebase from "./firebase";
import {connect} from "react-redux";
import {setUser} from "../redux/actions/user";
class Register extends Component {
    constructor(){
        super();
        this.register=this.register.bind(this);
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
            <article style={styles.main}>
                <h3 className="innerScrnHdr" style={styles.itm}>register screen</h3>
                <input id="username" type="text" className="inputItm" placeholder="enter a username" style={styles.itm} autoFocus/>
                <input id="pwd" type="password" className="inputItm" placeholder="enter password" style={styles.itm}/>
                <input id="pwd2" type="password" className="inputItm" placeholder="verify password" style={styles.itm}/>
                <button className="btn" onClick={this.register} style={styles.itm}>register</button> 
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
        const email=document.getElementById("username").value+"12345678@gmail.com";
        const password=document.getElementById("pwd").value;

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
       this.props.setUser(document.getElementById("username").value,firebase.auth().currentUser.uid);
       this.props.switchToMain();
/*       
        if (firebase.auth().currentUser){
            const database = firebase.database();
            database.ref("users").child(firebase.auth().currentUser.uid).set({
                likes:{}
            })
            .then(()=>{
                this.props.setUser(document.getElementById("username").value,firebase.auth().currentUser.uid);
                this.props.switchToMain();
            })
            .catch((err)=>{
                alert ("err in regiter_cont. err is - "+err.message);
            });
       }
*/
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
    },
}

const mapStateToProps = (state) => {
    return {
        user:state.user,
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser:(name,id)=>dispatch(setUser(name,id,[])),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
//export default Register;