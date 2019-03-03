const user = (state = {}, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                userId: action.payload.userId,
                token: action.payload.token,
            }
        case 'SIGN_UP':
        case 'LOG_OUT':
            return {}
        default:
            return state;
    }
}

export default user;