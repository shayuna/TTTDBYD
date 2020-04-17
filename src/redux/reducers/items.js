/*
#1 - shay = 13/04/2020 - 10:02 - now what ? concentrate a little bit. the text is within you. shouldn't be that text exactly. shouldn't delete it also. just
rely on the fact that the relevant text will somehow miraculously appear. 
arConsumed array and surrounding ecosystem was created because the same item can be present in more than one list, 
so we need a way not to increase/decrease the likes counter more than once when the user presses the 'like' btn.
*/
const initialState = {
}

const itemsReducer = (state=initialState,{type,tag,items,id,vl}) => {
    let arConsumed=[];//#1
    let objToRet1;
    switch (type){
        case "CLEAR_ITEMS":
            return {};
        case "GET_ITEMS_SUCCESS":
            let objToRet={
                ...state,
            };
            objToRet[tag]=items;
            return objToRet;
        case "UPDATE_LIKES":
            objToRet1={
                ...state,
            };
            for (const prop in objToRet1){
                if (Array.isArray(objToRet1[prop])){
                    objToRet1[prop].forEach((itm,ii)=>{
                        if (itm.id===id && !arConsumed.includes(itm.id)){
                            itm.likes+=vl;
                            arConsumed.push((itm.id));
                        }
                    })
                }
            };
            return objToRet1;
        case "UPDATE_AFFINITIES":
            objToRet1={
                ...state,
            };
            for (const prop in objToRet1){
                if (Array.isArray(objToRet1[prop])){
                    objToRet1[prop].forEach((itm,ii)=>{
                        if (itm.id===id && !arConsumed.includes(itm.id)){
                            itm.affinities+=vl;
                            arConsumed.push((itm.id));
                        }
                    })
                }
            };
            return objToRet1;
        default:
            return state;
        }
}


export default itemsReducer;