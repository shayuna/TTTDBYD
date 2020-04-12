import firebase from "../../components/firebase";    

export const getlist = (type="",id="")=>({
    type,
    id
});

export const getitems_success = (items,tag)=>({
    type:"GET_ITEMS_SUCCESS",
    items,
    tag
})

export const clearItems = ()=>({
    type:"CLEAR_ITEMS",
})

export const updateLikes = (id,vl)=>({
    type:"UPDATE_LIKES",
    id,
    vl
});

function insertItmIfExistsLocally(arNewItems,sItmId,oItems){
    let bFound=false,sCtgId;
    for (sCtgId in oItems){
        if (!bFound){
            oItems[sCtgId].forEach((oItm)=>{
                if (oItm.id===sItmId){
                    arNewItems.push(oItm);
                    bFound=true;
                    return false;
                }
            });
        }
    }
    return bFound;
}

export function getItems(filter,valToMatch,oUser,oItems) {
    return (dispatch) => {
        const database = firebase.database();
        let query=null,items=[],arNewItems=[],prop,iIndx;
        if (filter==="mylist"){
            for (prop in oUser.authored){
                if (!items.includes(prop)) items.push(prop);
            }
            for (prop in oUser.affinities){
                if (!items.includes(prop)) items.push(prop);
            }
            for (prop in oUser.likes){
                if (!items.includes(prop)) items.push(prop);
            }
            if (items.length>0){
                console.log ("got some items locally");
                for (iIndx=0;iIndx<items.length;iIndx++){
                    if (insertItmIfExistsLocally(arNewItems,items[iIndx],oItems)){
                        items.splice(iIndx,1);
                        iIndx--;
                        console.log ("got it locally - "+items[iIndx]);
                    };
                }
                if (items.length>0){
                    console.log ("something found in db");
                    items.forEach((itm)=>{
                        database.ref("items"+"/"+itm).once("value")
                        .then((snapshot)=>{
                            arNewItems.push({id:snapshot.key,...snapshot.val()});
                            if (arNewItems.length===items.length){
                                const arAtLastItems=arNewItems.filter((elm)=>{
                                    return elm.caption;
                                })
                                return dispatch(getitems_success(arAtLastItems,filter));
                            }
                        })
                        .catch((err)=>{
                            console.log("error in getting mylist in getitems in items actions in redux");
                        })
                    })
                }
            }
            else{
                return dispatch(getitems_success([],filter));
            }

        }
        else{
            console.log ("filter="+filter+" *** valtomatch="+valToMatch);
            if (valToMatch){
                query=database.ref("items").orderByChild(filter).equalTo(valToMatch).limitToLast(10);
            }else{
                query=database.ref("items").orderByChild(filter).limitToLast(10);
            }
            query.once("value")
            .then((snapshot)=>{
                snapshot.forEach((childsnapshot)=>{
                    items.push(
                        {
                            id:childsnapshot.key,
                            ...childsnapshot.val()
                        }                    
                    );
                });
                return dispatch(getitems_success(items,valToMatch ? valToMatch : filter));
            });
            
        }

    }
}
