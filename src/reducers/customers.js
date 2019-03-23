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
        case 'TOGGLE_VALIDITY': {
            let newCustomers = state.customers;
            newCustomers[action.payload.index].validity = action.payload.targetValidity;
            return {
                ...state,
                customers: newCustomers,
            }
        }
        default:
            return state
    }
}

export default customers;