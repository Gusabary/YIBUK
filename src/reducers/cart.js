const defaultState = {
    cart: [],
}

const cart = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_CART':
            return {
                ...state,
                cart: action.payload.cart,
            }
        default:
            return state
    }
}

export default cart;