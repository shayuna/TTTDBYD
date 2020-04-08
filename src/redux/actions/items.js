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
                if (snapshot.val().likes){
                    for (var prop in snapshot.val().likes){
                        items.push(snapshot.val().likes[prop].itemID);
                    }
                }
                if (snapshot.val().affinities){
                    for (var prop in snapshot.val().affinities){
                        items.push(prop);
                    }
                }
                const iTotalCount=items.length;
                let arNewItems=[];
                items.forEach((itm)=>{
                    database.ref("items"+"/"+itm).once("value")
                    .then((snapshot)=>{
                        arNewItems.push({id:snapshot.key,...snapshot.val()});
                        if (arNewItems.length==iTotalCount){
                            return dispatch(getitems_success(arNewItems,filter));
                        }
                    })
                    .catch((err)=>{
                        console.log("error in getting mylist in getitems in items actions in redux");
                    })
                })

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
