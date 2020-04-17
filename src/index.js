import React,{Component} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import Header from "./components/header";
import ItemsList from "./components/itemslist";
import About from "./components/About";
import Login from "./components/login";
import Register from "./components/register";
import ManageItem from "./components/manageitem";
import configureStore from "./redux/store/configurestore";
import firebase from "firebase";
import "./styles/style.scss?v=020219_1";
import "./styles/normalize.css?v=020219_1";
const store = configureStore();

const LOGIN_SCREEN=1;
const REGISTER_SCREEN=2;
const MAIN_SCREEN=3;
const ADD_ITEM=4;
const EDIT_ITEM=5;
const ABOUT_SCREEN=6
const MY_PAGE=7;

class App extends Component{
    constructor(props){
        super(props);
        this.about=this.about.bind(this);
        this.login=this.login.bind(this);
        this.register=this.register.bind(this);
        this.add=this.add.bind(this);
        this.main=this.main.bind(this);
        this.editItem=this.editItem.bind(this);
        this.getPageLink=this.getPageLink.bind(this);
        this.openMyPage=this.openMyPage.bind(this);
        this.setScreenToMain=this.setScreenToMain.bind(this);
        this.itemsListRef=React.createRef();

        var sUsr="";
        try{
            sUsr=(new URLSearchParams(window.location.search)).get("usr");
        }
        catch(err){
        }

        firebase.auth().signOut()
        .then(function() {
            // Sign-out successful.
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert (errorMessage);
            // An error happened
        });

        this.state={
            screen:MAIN_SCREEN,
            editItemDetails:{
                id:"",
                caption:"",
                description:"",
            },
            usr:sUsr,
        }

    }
    render(){
        return (
            <Provider store={store}>
                <article>
                    <Header login={this.login} register={this.register} about={this.about} add={this.add} getPageLink={this.getPageLink} openMyPage={this.openMyPage} user={store.getState().user.username} isMyPage={this.state.screen===MY_PAGE}/>
                        {(this.state.screen===MAIN_SCREEN || this.state.screen===MY_PAGE) && <ItemsList editItem={(sID,sCaption,sDescription)=>this.editItem(sID,sCaption,sDescription)} usr={this.state.usr} ref={this.itemsListRef} setScreenToMain={()=>this.setScreenToMain()}/>}
                        {this.state.screen===LOGIN_SCREEN && <Login switchToMain={this.main}/>} 
                        {this.state.screen===ABOUT_SCREEN && <About switchToMain={this.main}/>} 
                        {this.state.screen===REGISTER_SCREEN && <Register switchToMain={this.main}/>}
                        {this.state.screen===ADD_ITEM && <ManageItem switchToMain={this.main}/>} 
                        {this.state.screen===EDIT_ITEM && <ManageItem switchToMain={this.main} id={this.state.editItemDetails.id} caption={this.state.editItemDetails.caption} description={this.state.editItemDetails.description}/>} 
                </article>
            </Provider>
        );
    }
    about(){
        this.setState({
            screen:ABOUT_SCREEN,
        });
    }
    login(){
        this.setState({
            screen:LOGIN_SCREEN,
        });
    }
    register(){
        this.setState({
            screen:REGISTER_SCREEN,
        });
    }
    editItem(sID,sCaption,sDescription){
        this.setState({
            screen:EDIT_ITEM,
            editItemDetails:{
                id:sID,
                caption:sCaption,
                description:sDescription
            }
        })
    }
    main(){
        this.setState({
            screen:MAIN_SCREEN,
        });
    }
    add(){
        this.setState({
            screen:ADD_ITEM,
        });
    }
    getPageLink(){
        navigator.clipboard.writeText(window.location.href+"?usr="+store.getState().user.username)
        .then(()=>{
            alert ("the url has been copied to the clipboard");
        },(err)=>{
            console.error("failed to copy text to the clipboard. err is ",err);
        })
    }
    setScreenToMain(){
        this.setState({
            screen:MAIN_SCREEN,
        });
    }
    openMyPage(){
        this.setState({
            screen:MY_PAGE,
        });
        this.itemsListRef.current.getWrappedInstance().openMyPage();
    }
}
ReactDOM.render(<App/>,document.querySelector("#eRoot"));