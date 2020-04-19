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
import {LOGIN_SCREEN,REGISTER_SCREEN,MAIN_SCREEN,ADD_ITEM,EDIT_ITEM,ABOUT_SCREEN,MY_PAGE} from "./constants.js";
import "./styles/style.scss?v=020219_1";
import "./styles/normalize.css?v=020219_1";

const store = configureStore();

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
        this.setScreen=this.setScreen.bind(this);
        this.openHomePage=this.openHomePage.bind(this);
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
                    <Header login={this.login} reload={this.openHomePage} register={this.register} about={this.about} add={this.add} getPageLink={this.getPageLink} openMyPage={this.openMyPage} user={store.getState().user.username} isMyPage={this.state.screen===MY_PAGE}/>
                        {(this.state.screen===MAIN_SCREEN || this.state.screen===MY_PAGE) && <ItemsList editItem={(sID,sCaption,sDescription)=>this.editItem(sID,sCaption,sDescription)} usr={this.state.usr} ref={this.itemsListRef} setScreen={(iScrn)=>this.setScreen(iScrn)}/>}
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
        this.setScreen(MAIN_SCREEN);
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
    setScreen(iScrn){
        this.setState({
            screen:iScrn,
        });
    }
    openMyPage(){
        this.itemsListRef.current.getWrappedInstance().openMyPage();
    }
    openHomePage(){
        this.itemsListRef.current.getWrappedInstance().getList("likes");
    }
}
ReactDOM.render(<App/>,document.querySelector("#eRoot"));