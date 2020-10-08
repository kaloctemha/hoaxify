
import * as ACTIONS from './Constants'

const defaultState = {
  userName: undefined,
  isLoggedIn: false,
  dislpayName: undefined,
  image: undefined,
  password: undefined
};

// reducer :  son state ve action alarak bize guncel state i donmeli
// Redux TopBar.js den dispatch ettigimiz action'un buraya dusecegini nerden biliyor?
//  Cunku asagida createStore() methodunda biz bu reducer i parametre olarak verdik.
// ayni store uzerinde bir action gelince Redux buraya gelecegini bilecek
const authReducer = (state = { ...defaultState }, action) => {
  if (action.type === ACTIONS.LOGOUT_SUCCESS) {
    return defaultState;
  } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
    return {
      ...action.payload,
      isLoggedIn: true
    }
  }
  return state;
}

export default authReducer;