
const initialState = {
}

const userReducer = (state=initialState,{type,oUser,itemId,itemVal,operation}) => {
    switch (type){
        case "SET_USER":
            return oUser;
        case "UPDATE_AFFINITY_VAL":
            let oAffinities={...state.affinities};
            if (itemVal==="0"){
                delete oAffinities[itemId];
            }
            else{
                oAffinities[itemId]={rel:itemVal};
            }
            return {
                ...state,
                affinities:oAffinities,
            }
        case "UPDATE_AUTHORED_IN_USER":
            let oAuthored={...state.authored};
            switch(operation){
                case "ADD":
                    oAuthored[itemId]="1";
                    break;
                case "REMOVE":
                    delete oAuthored[itemId];
                    break;
            }
            return {
                ...state,
                authored:oAuthored,
            }
        case "UPDATE_LIKES_IN_USER":
            let oLikes={...state.likes};
            switch (operation){
                case "ADD":
                    oLikes[itemId]="1";
                    return {
                        ...state,
                        likes:oLikes,
                    };
                case "REMOVE":
                    delete oLikes[itemId];
                    return {
                        ...state,
                        likes:oLikes,
                    }
            }
        default:
            return state;
    }
}


export default userReducer;