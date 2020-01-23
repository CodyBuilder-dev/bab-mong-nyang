export const SUBMIT_LOGIN = "login/SUBMIT_LOGIN";
export const CHANGE_INPUT = "login/CHANGE_INPUT";
export const SUBMIT_LOGOUT = "login/SUBMIT_LOGOUT";

export const submitLogin = input => ({
  type: SUBMIT_LOGIN,
  payload: input
});
export const changeInput = input => ({
  type: CHANGE_INPUT,
  payload: input
});
export const submitLogout = input => ({
  type: SUBMIT_LOGOUT,
  payload: input
});

const initialState = {
  curId: "",
  inputId: "",
  inputPw: "",
  logedin: false
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        state: {
          curid: action.payload,
          inputId: "",
          inputPw: "",
          logedin: true
        }
      };
    case CHANGE_INPUT:
      return {
        state: {
          curid: state.curId,
          inputId: action.payload.id,
          inputPw: action.payload.pw,
          logedin: state.logedin
        }
      };
    case SUBMIT_LOGOUT:
      return {
        state: { curid: "", inputId: "", inputPw: "", logedin: false }
      };
    default:
      return {
        state
      };
  }
};

export default login;
