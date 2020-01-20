export const SUBMIT_LOGIN = 'login/SUBMIT_LOGIN';
export const CHANGE_INPUT = 'login/CHANGE_INPUT';
export const SUBMIT_LOGOUT = 'login/SUBMIT_LOGOUT';

export const submitLogin = input =>({
    type : SUBMIT_LOGIN, payload : input
});
export const changeInput = input => ({
    type : CHANGE_INPUT , payload : input
})
export const submitLogout = input =>({
    type : SUBMIT_LOGOUT, payload : input
})

const initialState = {
    curId : '',
    input : '',
    logedin : false
}

const login = (state = {initialState}, action) => {
    switch (action.type){
        case SUBMIT_LOGIN:   
            return{
                state: {curid : action.payload , input : '', logedin : true} 
            };
        case CHANGE_INPUT:
            return{
                ...state,
                input: action.payload
            };
        case SUBMIT_LOGOUT:
            return{
                state : {curid : '' , input : '', logedin : false}
            }
        default:
            return {
                state
            };
    }
};

export default login;
