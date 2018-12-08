export const setUser = (name,id,likes)=>({
    type:"SET_USER",
    name,
    id,
    likes
});

export const updatelikesinuser = (itemId,operation)=>({
    type:"UPDATE_LIKES_IN_USER",
    itemId,
    operation
})