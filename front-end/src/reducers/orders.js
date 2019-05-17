const defaultState = {
    orders: [],
}

const parse = orders => {
    let parsedOrders = [];
    orders.forEach(order => {
        Object.keys(order.orderItem).forEach(bookId => {
            let parsedOrder = {};
            parsedOrder.orderId = order.orderId;
            parsedOrder.userId = order.userId;
            parsedOrder.time = order.time;
            parsedOrder.bookId = bookId;
            parsedOrder.quantity = order.orderItem[bookId];
            parsedOrders.push(parsedOrder);
        })
    });
    return parsedOrders;
}

const orders = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_ORDERS':
            return {
                ...state,
                orders: parse(action.payload.orders),
            }
        default:
            return state
    }
}

export default orders;