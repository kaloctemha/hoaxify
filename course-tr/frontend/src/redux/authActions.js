import * as ACTIONS from './Constants'
import { login, signUp } from "../api/apiCalls";
export const onLogOutSuccess = () => {
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


export const loginHandler = (creds) => {

    // normalde action olarak plain object(json) gerekir, biz burda bir fonksiyon donuyoruz
    // bu fonksiyonu isleyecek bir ara katmana ihtiyacimiz var. 
    // async action'lari islemek icn redux ile birlikte gelen 'thunk' library var. onu kullan
    return async function (dispatch) {
        const response = await login(creds);
        const authState = {
            ...response.data,
            password: creds.password
        }
        dispatch(loginSuccess(authState));
        return response;
    };
};

export const signUpHandler = (user) => {
    return async function(dispatch){
        const response = await signUp(user);
        await dispatch(loginHandler(user));
        return response;
    };
};