export const CHANGE_INPUT = "store/CHANGE_INPUT";
export const SUBMIT_FORM = "store/SUBMIT_FORM";
export const VALIDATE_FORM = "store/VALIDATE_FORM";
export const SET_CURRENT_USER_NO = "store/SET_CURRENT_USER_NO";
export const SET_CURRENT_DEVICE_NO = "store/SET_CURRENT_DEVICE_NO";
export const CHANGE_STORE = "store/CHANGE_STORE";

export const changeInput = input => ({
  type: CHANGE_INPUT,
  payload: input
});

export const submitForm = form => ({
  type: SUBMIT_FORM,
  payload: form
});

export const validateForm = form => ({
  type: VALIDATE_FORM,
  payload: form
});

export const setCurrentUserNo = No => ({
  type: SET_CURRENT_USER_NO,
  payload: No
});

export const setCurrentDeviceNo = No => ({
  type: SET_CURRENT_DEVICE_NO,
  payload: No
});

export const changeStore = data => ({
  type : CHANGE_STORE,
  payload : data
});

//70.12.246.68:3000
//localhost:3000
const initialState = {
  input: {},
  url: "http://localhost:3000",
  currentUserNo: "",
  currentDeviceNo : "",
};
const store = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.payload
      };
    case SUBMIT_FORM:
      return {
        ...state,
        input: {}
      };
    case VALIDATE_FORM:
      return {
        ...state,
        input: {
          ...state.input,
          validated: action.payload
        }
      };
    case SET_CURRENT_USER_NO:
      return {
        ...state,
        input: {},
        currentUserNo: action.payload
      };
    case SET_CURRENT_DEVICE_NO:
      return {
        ...state,
        currentDeviceNo : action.payload
      };
    case CHANGE_STORE:
      return{
        ...state,
        ...action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default store;
