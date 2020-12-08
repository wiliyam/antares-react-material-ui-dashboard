const initState = {
    auth: false
};

const auth = (state = initState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case 'ENABLE':
            newState.auth = true;
            return newState;
        case 'DISABLE':
            newState.auth = false;
            return newState;
        default:
            return newState;
    }
};

module.exports = { auth };
