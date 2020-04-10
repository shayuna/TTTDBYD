import React,{Component} from "react";
import firebase from "./firebase";
import Button from "./button";
import LikeButton from "./LikeButton";
import {connect} from "react-redux";
import {getItems,updateLikes,clearItems} from "../redux/actions/items";
import {updateLikesInUser,updateAffinityVal,updateAuthoredInUser} from "../redux/actions/user";

class ItemsList extends Component {
    constructor(props){
        super(props);
        this.state={
            currentList:null,
        };
        this.isItemInLikes=this.isItemInLikes.bind(this);
        this.updatelikes_new=this.updatelikes_new.bind(this);
        this.setAffinity=this.setAffinity.bind(this);
        this.getAffinityValue=this.getAffinityValue.bind(this);
        this.openMyPage=this.openMyPage.bind(this);

    }
    render(){
        return (
            <div className="itemsList">
                {
                    this.state.currentList && this.props.items[this.state.currentList] && this.props.items[this.state.currentList].map((itm,ii)=>(
                        <article style={styles.itmStyle} className="itm" key={ii} data-id={itm.id}>
                            <div className="hdr">{itm.caption}</div>
                            <div className="content">{itm.description}</div>
                            <div className="interactivePanel">
                                <Button caption={itm.username} withBorder="1" activateProperFunctionBoy={(event)=>{this.getList("username",itm.username)}}/>
                                <LikeButton caption={itm.likes} itmID={itm.id} isItmInLikes={this.isItemInLikes(itm.id)} updateLikes={this.updatelikes_new}/>
                                {itm.userid===this.props.user.id && <Button caption="Edit" withBorder="1" activateProperFunctionBoy={()=>this.editItem(itm.id,itm.caption,itm.description)}/>}
                                {itm.userid===this.props.user.id && <Button caption="Del" withBorder="1" activateProperFunctionBoy={()=>this.delItem(itm.id)}/>}
                                <select className="action" value={this.getAffinityValue(itm.id)} onChange={(e)=>this.setAffinity(itm.id,e.target)} disabled={!this.props.user.id ? "disabled" : ""}><option value="0">not for me</option><option value="1">want to</option><option value="2">did it</option><option value="3">doing it</option></select>
                            </div>
                        </article>
                    ))
                }
                <button onClick={()=>this.getpopular()}>popular</button>
            </div>
        )
    }
    isItemInLikes(sItemID){
        return this.props.user.likes && !!this.props.user.likes[sItemID];
    }
    getAffinityValue(sItemID){
        return this.props.user.affinities && this.props.user.affinities[sItemID] ? this.props.user.affinities[sItemID].rel : "0";
    }
    setAffinity(sItemID,elm){
        if (!!this.props.user.id){
            const oDB=firebase.database();
            oDB.ref("users/"+this.props.user.id+"/affinities/"+sItemID).remove();
            if (elm.value!=="0")oDB.ref("users/"+this.props.user.id+"/affinities/"+sItemID).set({rel:elm.value});
            this.props.updateAffinityVal(sItemID,elm.value);
        }
    }
    updatelikes_new(itmID,likesNum){
        const sUserID=this.props.user.id;
        const sItemID=itmID;
        const iLikes=parseInt(likesNum,10);
        if (sUserID){
            const database = firebase.database();
            const bExists=this.isItemInLikes(sItemID);
            this.props.updateLikes(sItemID,bExists ? -1 : 1);
            this.props.updateLikesInUser(sItemID,bExists ? "REMOVE" : "ADD");
            database.ref("items/"+sItemID+"/likes").transaction(likes1=>{
                if (!isNaN(likes1)){
                    likes1+= bExists ? -1 : 1;
                }
                return likes1;
            })
            database.ref("users/"+sUserID+"/likes").orderByChild("itemID").equalTo(sItemID).once("value",snapshot=>{
                if (snapshot.exists()){
                    database.ref("users/"+sUserID+"/likes/"+Object.keys(snapshot.val())[0]).remove()
                    .then(()=>{
                    })
                    .catch(err=>{
                    })
                    .finally(()=>{
                    });
                }
                else{
                    database.ref("users/"+sUserID+"/likes").push({
                        "itemID":sItemID
                    })
                    .then(()=>{
                    })
                    .catch((err)=>{
                    })
                    .finally(()=>{
                    });
                }
            })
        }
    }
    getpopular(){
        this.getList("likes");
    }
    addTestData(){
/*
        const database = firebase.database();
        database.ref("items").push({
            caption:"omega",
            description:"this omega will blow your mind out, i guarantee it",
            username:"shay1",
            likes:80
        })
        database.ref("items").push({
            caption:"diving",
            description:"diving is fun, especially when you do it with sharks",
            username:"shay",
            likes:40
        })
        database.ref("items").push({
            caption:"screaming",
            description:"stand on a hilltop and scream, nothing beats it",
            username:"shay",
            likes:82
        })
        database.ref("items").push({
            caption:"sing",
            description:"sing softly, sing loud just sing",
            username:"shay1",
            likes:53
        })
        database.ref("items").push({
            caption:"eat candies",
            description:"eat them of all kinds religion and gender",
            username:"shay1",
            likes:74
        })
*/
    }
    getList(filter,valToMatch){
        // establish the list identifier to look for
        const id=valToMatch ? valToMatch : filter;
        if (!this.props.items[id]){
            console.log("going to db");
            this.state.currentList=id;
            this.props.getItems(filter,valToMatch);
        }
        else{
            console.log("not going to db");
            this.setState({
                currentList:id,
            });
        }
        
    }
    componentDidMount(){
        if (this.props.usr)this.getList("username",this.props.usr);
        else this.getList("likes");
    }
    componentWillReceiveProps(newProps){
//        console.log ("current list is - "+newProps.items.currentList);
        this.setState();
    }
    editItem(sID,sCaption,sDescription){
        this.props.editItem(sID,sCaption,sDescription);
    }
    delItem(sID){
        const database = firebase.database();
        database.ref("items/"+sID)
        .remove()
        .then(()=>{
            this.props.clearItems();//by this we are forcing the itemslist component to update from db
            this.props.updateAuthoredInUser(sID,"REMOVE");
            this.getList(this.state.currentList);
        })
        .catch((err)=>{
            alert ("an error was detected in del item. err is - "+err);
        })
    }
    openMyPage(){
        this.state.currentList="mylist";
        this.props.getItems("mylist","",this.props.user.id);
    }
};

const styles={
    itmStyle:{
        display:"flex",
        alignItems:"center",
    }
}

const mapStateToProps = (state) => {
    return {
        items:state.items,
        user:state.user,
        /*
        NodesManager: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading,
        selectedID:state.nodeSelection,
        treeHasChanged:state.treeHasChanged,
*/
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getItems: (filter,valToMatch,sUsrId) => dispatch(getItems(filter,valToMatch,sUsrId)),
        updateLikesInUser:(id,operation)=>dispatch(updateLikesInUser(id,operation)),
        updateLikes:(id,vl)=>dispatch(updateLikes(id,vl)),
        updateAffinityVal:(id,vl)=>dispatch(updateAffinityVal(id,vl)),
        updateAuthoredInUser:(itemId,operation)=>dispatch(updateAuthoredInUser(itemId,operation)),
        clearItems:()=>dispatch(clearItems()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps,null,{ withRef: true })(ItemsList);
//export default ItemsList;