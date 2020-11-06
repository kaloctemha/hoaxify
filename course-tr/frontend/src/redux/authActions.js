import * as ACTIONS from './Constants'
import { login, signUp, setAuthorizationHeader } from "../api/apiCalls";
export const logOutSuccess = () => {
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    }
}
export const loginSuccess = (authState) => {
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    }
};



export const loginHandler = credentials => {
    
    return async function(dispatch) {
      const response = await login(credentials);
      console.log("response objct is ",response);
      const authState = {
        ...response.data.user,
        password: credentials.password,
        token: response.data.token
      };

      console.log("authState objct is ",authState);
      dispatch(loginSuccess(authState));
      //setAuthorizationHeader(credentials);
      return response;
    };
  };

// export const loginHandler = (creds) => {
//     console.log("credential objct is ",creds);
//     // normalde action olarak plain object(json) gerekir, biz burda bir fonksiyon donuyoruz
//     // bu fonksiyonu isleyecek bir ara katmana ihtiyacimiz var. 
//     // async action'lari islemek icn redux ile birlikte gelen 'thunk' library var. onu kullan
//     return async function (dispatch) {
//         const response = await login(creds);
//         const authState = {
//             ...response.data.username,
//             password: creds.password
//         }
//         dispatch(loginSuccess(authState));
//         return response;
//     };
// };

export const signUpHandler = (user) => {
    return async function(dispatch){
        const response = await signUp(user);
        await dispatch(loginHandler(user));
        return response;
    };
};