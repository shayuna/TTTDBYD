import React,{Component} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import Header from "./components/header";
import ItemsList from "./components/itemslist";
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

class App extends Component{
    constructor(){
        super();
        this.state={
            screen:MAIN_SCREEN,
            editItemDetails:{
                id:"",
                caption:"",
                description:"",
            }
        }
        this.login=this.login.bind(this);
        this.register=this.register.bind(this);
        this.add=this.add.bind(this);
        this.main=this.main.bind(this);
        this.editItem=this.editItem.bind(this);

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


    }
    render(){
        return (
            <Provider store={store}>
                <article>
                    <Header login={this.login} register={this.register} add={this.add} user={store.getState().user.name}/>
                        {this.state.screen===MAIN_SCREEN && <ItemsList editItem={(sID,sCaption,sDescription)=>this.editItem(sID,sCaption,sDescription)}/>}
                        {this.state.screen===LOGIN_SCREEN && <Login switchToMain={this.main}/>} 
                        {this.state.screen===REGISTER_SCREEN && <Register switchToMain={this.main}/>}
                        {this.state.screen===ADD_ITEM && <ManageItem switchToMain={this.main}/>} 
                        {this.state.screen===EDIT_ITEM && <ManageItem switchToMain={this.main} id={this.state.editItemDetails.id} caption={this.state.editItemDetails.caption} description={this.state.editItemDetails.description}/>} 
                </article>
            </Provider>
        );
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
}
ReactDOM.render(<App/>,document.querySelector("#eRoot"));