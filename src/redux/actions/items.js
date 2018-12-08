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

export function getitems(filter,valToMatch) {
    return (dispatch) => {
        const database = firebase.database();
        let query=null;
        if (valToMatch){
            query=database.ref("items").orderByChild(filter).equalTo(valToMatch).limitToLast(10);
        }else{
            query=database.ref("items").orderByChild(filter).limitToLast(10);
        }
        query.once("value")
        .then((snapshot)=>{
            let items=[];
            snapshot.forEach((childsnapshot)=>{
                items.push(
                    {
                        id:childsnapshot.key,
                        ...childsnapshot.val()
                    }                    
                );
            });
            return dispatch(getitems_success(items,valToMatch ? valToMatch : filter));
        })
        .catch((err)=>{
            console.log ("error in loading data. err is - ",err);
        });
    };
}
