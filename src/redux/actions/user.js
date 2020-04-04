export const setUser = (name,id,likes,affinities)=>({
    type:"SET_USER",
    name,
    id,
    likes,
    affinities
});
export const updateAffinityVal = (affinityId,affinityVl)=>({
    type:"UPDATE_AFFINITY_VAL",
    affinityId,
    affinityVl
})

export const updatelikesinuser = (itemId,operation)=>({
    type:"UPDATE_LIKES_IN_USER",
    itemId,
    operation
})