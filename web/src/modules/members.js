
const CHANGE_INPUT ='members/CHANGE_INPUT';
const INSERT = 'members/INSERT';
const LOGIN = 'members/LOGIN';

export const changeInput = input => ({
    type : CHANGE_INPUT, payload: input
});
export const insert = form =>({
    type : INSERT, payload : form
});
export const login = text=>({
    type : LOGIN , payload : {
        curId : text
    }
})
const initialState = {
    input : [],
    curID : ''
}

const input = (state = initialState, action) => {
    switch (action.type){
        case CHANGE_INPUT:
            return{
                ...state,
                input : action.payload
            };
        case 
    };
}