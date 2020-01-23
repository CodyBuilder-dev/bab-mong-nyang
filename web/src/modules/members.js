export const CHANGE_REGIST_INPUT = "members/CHANGE_REGIST_INPUT";
export const VALIDATE_ID = "members/VALIDATE_ID";
export const SUBMIT_REGISTER = "members/SUBMIT_REGISTER";

export const changeRegistInput = input => ({
  type: CHANGE_REGIST_INPUT,
  payload: input
});
export const validateId = id => ({
  type: VALIDATE_ID,
  payload: id
});
export const submitRegist = register => ({
  type: SUBMIT_REGISTER,
  payload: register
});
const initialState = {
  u_Id: "",
  u_Pw: "",
  u_Name: "",
  u_Email: "",
  pwcon: "",
  validated: false
};

const members = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_REGIST_INPUT:
      return {
        state: {
          u_Id: action.payload.u_Id,
          u_Pw: action.payload.u_Pw,
          u_Name: action.payload.u_Name,
          u_Email: action.payload.u_Email,
          pwcon: action.payload.pwcon,
          validated: action.payload.validated
        }
      };
    case SUBMIT_REGISTER:
      return {
        state: initialState
      };
    case VALIDATE_ID:
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
