const defaultState = {
    redirectTo: null,
    isEditing: false,
    isLoading: false,
}

const common = (state = defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
        case 'SIGN_UP':
            return {
                ...state,
                redirectTo: '/',
                isLoading: false,
            }
        case 'ADD_BOOK':
        case 'ADD_BOOK_CANCEL':
        case 'DELETE_BOOKS':
        case 'EDIT_END':
            return {
                ...state,
                redirectTo: '/Manage',
                isEditing: false,
                isLoading: false,
            }
        case 'LOAD_BOOKS_AFTER_BUY':
            return {
                ...state,
                redirectTo: '/Cart',
                isLoading: false,
            }
        case 'EDIT_START':
            return {
                ...state,
                isEditing: true,
            }
        case 'LOAD_BOOKS':
            case 'LOAD_CART':
            return {
                ...state,
                isLoading: false,
            }
        case 'REDIRECTED':
            return {
                ...state,
                redirectTo: null,
            }
        case 'ASYNC_START':
            return {
                isLoading: true,
            }
        default:
            return state
    }
}

export default common;