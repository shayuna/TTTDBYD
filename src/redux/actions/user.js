export const setUser = (oUser)=>({
    type:"SET_USER",
    oUser
});
export const updateAffinityValInUser = (itemId,itemVal)=>({
    type:"UPDATE_AFFINITY_VAL_IN_USER",
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