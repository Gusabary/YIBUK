function isPromise(v) {
    return v && typeof v.then === 'function';
}

const promiseMiddleware = store => next => action => {
    console.log("---action.payload---")
    console.log(action)
    if (isPromise(action.payload)) {
        store.dispatch({ type: 'ASYNC_START' })
        console.log("---payload----")
        console.log(action.payload)
        action.payload.then(
            res => {
                action.payload = res;  //Critical Step: concent action.payload from Promise to Object!
                store.dispatch(action);
            }
        );
        return;
    }
    next(action);
};

export default promiseMiddleware;

//Source: BPM-lab, lxyl.

