const defaultState = {
    cart: [],
}

const cart = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_CART':
        case 'BUY_END':
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: action.payload.cart,
            }
        
            
        case 'BUY_BOOKS':
        default:
            return state
    }
}

export default cart;