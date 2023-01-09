const Reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
            };
        case 'LOGIN_FAIL':
            return {
                user: null,
            };
        case 'LOG_OUT':
            return {
                user: null,
            };
        default:
            return state;
    }
};

export default Reducer;