const defaultState = {
    customers: [],
}

const customers = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOAD_CUSTOMERS':
            return {
                ...state,
                customers: action.payload.users,
            }
        default:
            return state
    }
}

export default customers;