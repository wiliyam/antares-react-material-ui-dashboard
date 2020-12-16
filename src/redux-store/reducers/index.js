const initState = {
    isLoading: false,
    auth: false
}

const reducer = (state = initState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'LOADING_ENABLE':
            newState.isLoading = true;
            return newState;
        case 'LOADING_DISABLE':
            newState.isLoading = false;
            return newState;
        case 'AUTH_ENABLE':
            newState.auth = true;
            return newState;
        case 'AUTH_DISABLE':
            newState.auth = false;
            return newState;
        default:
            return newState;
    }
};

module.exports = { reducer };
