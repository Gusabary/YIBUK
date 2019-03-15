const defaultState = {
    maxPosts: 1,
    books: [],
}

const posts = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_BOOKS':
            return {
                ...state,
                books: action.payload.books,
            }
        case 'ADD_BOOK':
            return {
                ...state,
                books: state.books.concat(action.payload.newBook),
            }
        case 'DELETE_BOOKS': {
            let tmp = state.books;
            const indexOfDeleted = action.payload.indexOfDeleted.reverse();
            indexOfDeleted.forEach(element => {
                tmp.splice(element, 1);
            });
            return {
                ...state,
                books: tmp,
            }
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