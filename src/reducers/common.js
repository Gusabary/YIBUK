const defaultState = {
    redirectTo: null,
    isEditing: false,
}

const common = (state = defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
        case 'SIGN_UP':
            return {
                ...state,
                redirectTo: '/',
            }
        case 'ADD_BOOK':
        case 'ADD_BOOK_CANCEL':
        case 'DELETE_BOOKS':
        case 'EDIT_END':
            return {
                ...state,
                redirectTo: '/Manage',
                isEditing: false,
            }
        case 'EDIT_START':
            return {
                ...state,
                isEditing: true,
            }
        case 'REDIRECTED':
            return {
                ...state,
                redirectTo: null,
            }
        /*case 'ASYNC_START':
            return {
                isLoading: true,
            }*/
        default:
            return state
    }
}

export default common;