
const initialState = {
    name:"",
    likes:[],
    affinities:{},
}

const userReducer = (state=initialState,{type,name,id,likes,itemId,operation,affinities,affinityId,affinityVl}) => {
    switch (type){
        case "SET_USER":
            return {
                ...state,
                name,
                id,
                likes,
                affinities: affinities ? affinities : {},
            };
        case "UPDATE_AFFINITY_VAL":
            let oAffinities={...state.affinities};
            if (affinityVl==="0"){
                delete oAffinities[affinityId];
            }
            else{
                oAffinities[affinityId]={rel:affinityVl};
            }
            return {
                ...state,
                affinities:oAffinities,
            }
        case "UPDATE_LIKES_IN_USER":
            switch (operation){
                case "ADD":
                    return {
                        ...state,
                        likes:[...state.likes,itemId],
                    }
                    break;
                case "REMOVE":
                    return {
                        ...state,
                        likes:[...state.likes.filter((likeId)=>likeId!=itemId)],
                    }
                    break;
            }
        default:
            return state;
    }
}


export default userReducer;