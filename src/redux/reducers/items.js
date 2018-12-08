
const initialState = {
}

const itemsReducer = (state=initialState,{type,tag,items,id,vl}) => {
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
            let objToRet1={
                ...state,
            };
            for (const prop in objToRet1){
                if (Array.isArray(objToRet1[prop])){
                    objToRet1[prop].forEach((itm,ii)=>{
                        if (itm.id===id){
                            itm.likes+=vl;
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