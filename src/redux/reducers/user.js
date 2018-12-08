
const initialState = {
    name:"",
    likes:[],
}

const userReducer = (state=initialState,{type,name,id,likes,itemId,operation}) => {
    switch (type){
        case "SET_USER":
            return {
                ...state,
                name,
                id,
                likes
            };
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