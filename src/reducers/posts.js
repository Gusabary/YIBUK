const defaultState = {
    maxPosts: 1,
    posts: [],
    isEditing: false,
    isDeleting: false,
}

const posts = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_POSTS':
            return {
                maxPosts: action.payload.maxPosts,
                posts: action.payload.posts.reverse(),
            }
        case 'EDIT_START':
            return {
                ...state,
                isEditing: true,
                postId: action.payload.postId,
                index: action.payload.index,
            }
        case 'EDIT_END':
            return {
                ...state,
                isEditing: false,
            }
        case 'DELETE_START':
            return {
                ...state,
                isDeleting: true,
            }
        case 'DELTE_END':
            return {
                ...state,
                isDeleting: false,
            }
        default:
            return state
    }
}

export default posts;