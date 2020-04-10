export const setUser = (oUser)=>({
    type:"SET_USER",
    oUser
});
export const updateAffinityVal = (itemId,itemVal)=>({
    type:"UPDATE_AFFINITY_VAL",
    itemId,
    itemVal
})
export const updateAuthoredInUser = (itemId,operation)=>({
    type:"UPDATE_AUTHORED_IN_USER",
    itemId,
    operation
})
export const updateLikesInUser = (itemId,operation)=>({
    type:"UPDATE_LIKES_IN_USER",
    itemId,
    operation
})