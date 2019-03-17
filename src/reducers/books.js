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
                bookInEditing: action.payload.index,
            }
        case 'EDIT_END': {
            const index = action.payload.index;
            let tmp = state.books;
            tmp[index] = action.payload.newBook;
            return {
                ...state,
                bookInEditing: 0,
                books: tmp,
            }
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