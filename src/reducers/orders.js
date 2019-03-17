const defaultState = {
    orders: [],
}

const orders = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_ORDERS':
            return {
                ...state,
                orders: action.payload.orders,
            }
        default:
            return state
    }
}

export default orders;