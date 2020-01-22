export const CHANGE_INPUT = 'store/CHANGE_INPUT';
export const SUBMIT_FORM = 'store/SUBMIT_FORM';
export const VALIDATE_FORM = 'store/VALIDATE_FORM';
export const SET_CURRENT_ID = 'store/SET_CURRENT_ID';

export const changeInput = input=>({
    type : CHANGE_INPUT, payload : input
});

export const submitForm = form=>({
    type : SUBMIT_FORM, payload : form
});

export const validateForm = form=>({
    type : VALIDATE_FORM, payload : form
});

export const setCurrentID = id =>({
    type : SET_CURRENT_ID, payload : id
});

const initialState = {
        input : {},
        url : 'http://localhost:3000',
        currentID : ''
}
const store = (state = initialState, action) =>{
    switch(action.type){
        case CHANGE_INPUT:
            return{
                ...state,
                input : action.payload
            };
        case SUBMIT_FORM:
            return{
                ...state,
                input : {}
            };
        case VALIDATE_FORM:
            return{
                ...state,
                input : {
                    ...state.input,
                    validated : action.payload
                }
            };
        case SET_CURRENT_ID:
            return{
                ...state,
                input : {},
                currentID : action.payload
                
            };
        default:
            return {
                ...state
            }
    }
};

export default store;