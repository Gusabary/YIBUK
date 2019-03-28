const defaultState = {
    redirectTo: null,
    isEditing: false,
    isLoading: false,
    mode: 0,
}

const common = (state = defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
        case 'SIGN_UP':
            return {
                ...state,
                redirectTo: '/',
            }
        case 'MANAGE_OK':
        case 'MANAGE_CANCEL':
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
        case 'LOAD_MODE':
            return {
                ...state,
                mode: action.payload,
            }
        case 'REDIRECTED':
            return {
                ...state,
                redirectTo: null,
            }
        case 'ASYNC_START':
            return {
                ...state,
                isLoading: true,
            }
        case 'LOAD_BOOKS':
        case 'LOAD_CART':
        case 'LOAD_CUSTOMERS':
        case 'LOAD_ORDERS':
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}

export default common;