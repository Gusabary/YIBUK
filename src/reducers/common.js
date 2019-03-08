const defaultState = {
    redirectTo: null,
}

const common = (state = defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
        case 'SIGN_UP':
        case 'ADD_POST':
        case 'EDIT_END':
            return {
                ...state,
                redirectTo: '/',
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