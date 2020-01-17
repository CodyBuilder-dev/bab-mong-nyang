
export const CHANGE_REGIST_INPUT ='members/CHANGE_REGIST_INPUT';
export const CHANGE_LOGIN_INPUT = 'members/CHANGE_LOGIN_INPUT';
export const INITIALIZE_FORM = 'members/INITIALIZE_FORM';
export const CHANGE_CURID = 'members/CHANGE_CURID';
export const SUBMIT_REGISTER = 'members/SUBMIT_REGISTER';

export const changeRegistInput = input => ({
    type : CHANGE_REGIST_INPUT, payload: input
});
export const changeLoginInput = input => ({
    type : CHANGE_LOGIN_INPUT, payload : input
})
export const initializeForm = () =>({
    type : INITIALIZE_FORM
});
export const changeCurid = id => ({
    type : CHANGE_CURID , payload : id
})
export const submitRegist = register => ({
    type : SUBMIT_REGISTER, payload : register
})
const initialState = {
    register : 
        {
            name : '',
            id : '' ,
            pw : '',
            email : ''
        },
    login : {
            id : '',
            pw : ''
    },
    curID : ''
}

const members = (state = initialState, action) => {
    switch (action.type){
        case CHANGE_REGIST_INPUT:
            return{
                ...state,
                register : action.payload
            };
        case CHANGE_LOGIN_INPUT:
            return{
                ...state,
                login : action.payload
            };
        case INITIALIZE_FORM:
            return{
                state : initialState
            };
        case CHANGE_CURID:
            return{
                ...state,
                curID : action.payload
            };
        case SUBMIT_REGISTER:
            return {
                ...state
            };
        default:
            return {
                state
            };
    }
};

export default members;
