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

export const clearitems = ()=>({
    type:"CLEAR_ITEMS",
})
/*

export const updatelikes = (id,likes)=>{
    return (dispatch) => {
        const database = firebase.database();
        database.ref("items/"+id).update({
            likes
        },()=>{
            return dispatch(updatelikes_success(id));
        });
    };
}
*/
export const updatelikes = (id,vl)=>({
    type:"UPDATE_LIKES",
    id,
    vl
});

export function getitems(filter,valToMatch,sUsrId) {
    return (dispatch) => {
        const database = firebase.database();
        let query=null;
        if (valToMatch){
            query=database.ref("items").orderByChild(filter).equalTo(valToMatch).limitToLast(10);
        }else if (filter==="mylist"){
            //not implemented yet, true to 05/04/2020. maybe we can assemble all the user's assets
            // id's and then build a query that will fetch all of it, ordered.use console.log
            // to test the first phase of the task.
            query=database.ref("users/"+sUsrId);
        }else{
            query=database.ref("items").orderByChild(filter).limitToLast(10);
        }
        query.once("value")
        .then((snapshot)=>{
            let items=[];
            if (filter==="mylist"){
                if (snapshot.val() && snapshot.val().authored){
                    for (var prop in snapshot.val().authored){
                        if (!items.includes(prop))items.push(prop);
                    }
                }
                if (snapshot.val() && snapshot.val().likes){
                    for (var prop in snapshot.val().likes){
                        if (!items.includes(snapshot.val().likes[prop].itemID))items.push(snapshot.val().likes[prop].itemID);
                    }
                }
                if (snapshot.val() && snapshot.val().affinities){
                    for (var prop in snapshot.val().affinities){
                        if (!items.includes(prop))items.push(prop);
                    }
                }
                const iTotalCount=items.length;
                let arNewItems=[];
                if (items.length>0){

                    items.forEach((itm)=>{
                        database.ref("items"+"/"+itm).once("value")
                        .then((snapshot)=>{
                            arNewItems.push({id:snapshot.key,...snapshot.val()});
                            if (arNewItems.length==iTotalCount){
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
                else{
                    return dispatch(getitems_success([],filter));
                }

            }else{
                snapshot.forEach((childsnapshot)=>{
                    items.push(
                        {
                            id:childsnapshot.key,
                            ...childsnapshot.val()
                        }                    
                    );
                });
                return dispatch(getitems_success(items,valToMatch ? valToMatch : filter));
            }
        })
        .catch((err)=>{
            console.log ("error in loading data. err is - ",err);
        });
    };
}
