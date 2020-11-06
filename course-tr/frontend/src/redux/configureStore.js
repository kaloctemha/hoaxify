import { createStore, applyMiddleware, compose } from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';
import {setAuthorizationHeader} from '../api/apiCalls';

const secureLS = new SecureLS();

const loggedInState = {
    isLoggedIn: true,
    username: 'user1',
    displayName: 'disp1',
    image: null,
    password: 'afacan'
};

const getStateFromStorage = () => {
    const hoaxAuth = secureLS.get('hoax-auth'); // sayfa refresh ettiginde login ucmasin diye
    // localstorage a kaydedip tekrar okuyoruz

    let stateInLocalStorage = {
        username: undefined,
        isLoggedIn: false,
        dislpayName: undefined,
        image: undefined,
        password: undefined
    }

    if (hoaxAuth) {
        return hoaxAuth;
    }
    return stateInLocalStorage;
}

const updateStateInStorage = (newState) => {
    secureLS.set('hoax-auth', newState);
}

const configureStore = () => {
    // createStore icerisine reducer paslamaliyiz ve bir method olmali
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState);
    const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;;
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

    store.subscribe(() => {
        updateStateInStorage(store.getState());
    });

    return store;
}

export default configureStore;