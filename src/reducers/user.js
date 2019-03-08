const defaultState = {
    userId: 0,
    identity: 2, //2 means 'visitor', 0 means 'customer', 1 means 'administrator'
    validity: 1,
}

const user = (state =defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                userId: action.payload.userId,
                identity: action.payload.identity,
                validity: action.payload.validity,
            }
        case 'SIGN_UP':
        case 'LOG_OUT':
            return {
                ...state,
                identity: 0,
            }
        default:
            return state;
    }
}

export default user;