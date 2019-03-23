const defaultState = {
    books: [],
    bookInEditing: 0,
}

const posts = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_BOOKS':
            return {
                ...state,
                books: action.payload.books,
            }
        case 'EDIT_START':
            return {
                ...state,
                bookInEditing: action.payload.index,
            }
        
        default:
            return state
    }
}

export default posts;