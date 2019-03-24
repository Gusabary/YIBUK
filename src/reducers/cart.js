const defaultState = {
    cart: [],
    toBuy: [],
}

const cart = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_CART': {
            const cart = action.payload.cart
            let toBuy = [];
            cart.map((element) => {
                toBuy.push(element.quantity)
            })
            return {
                ...state,
                cart: cart,
                toBuy: toBuy,
            }
        }
        case 'CHANGE_QUANTITY': {
            let tmp = state.toBuy;
            tmp[action.payload.index] = action.payload.quantity;
            //console.log(tmp);
            return {
                ...state,
                toBuy: tmp,
            }
        }    
        default:
            return state
    }
}

export default cart;