
export const CHANGE_REGIST_INPUT ='members/CHANGE_REGIST_INPUT';
export const VALIDATE_ID = 'members/VALIDATE_ID';
export const SUBMIT_REGISTER = 'members/SUBMIT_REGISTER';

export const changeRegistInput = input => ({
    type : CHANGE_REGIST_INPUT, payload: input
});
export const validateId = id =>({
    type : VALIDATE_ID , payload : id
})
export const submitRegist = register => ({
    type : SUBMIT_REGISTER, payload : register
})
const initialState = {
    id : '',
    pw : '',
    name : '',
    email : '',
    validated : true
}

const members = (state = initialState, action) => {
    switch (action.type){
        case CHANGE_REGIST_INPUT:   
            return{
                state : {
                    id : action.payload.id,
                    pw : action.payload.pw,
                    name : action.payload.name,
                    email : action.payload.email
                }
            };
        case SUBMIT_REGISTER:
            return {
                state : initialState
            };
        case VALIDATE_ID:
            return{
                ...state
            }
        default:
            return {
                state
            };
    }
};

export default members;
