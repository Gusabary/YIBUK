const defaultState = {
    status: 0, //0 means 'visitor', 1 means 'customer', 2 means 'administrator'
}

const user = (state =defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                status: action.payload-'0',
            }
        case 'SIGN_UP':
        case 'LOG_OUT':
            return {}
        default:
            return state;
    }
}

export default user;