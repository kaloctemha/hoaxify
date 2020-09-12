import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap-override.scss';
import * as serviceWorker from './serviceWorker';
import './i18n';
import App from './container/App';
import AuthenticationContext from './shared/AuthenticationContext'

// ACOLAK_LOG : index.html'den aldigin 'root' un icerisine App.js'den aldigin componentleri render et
ReactDOM.render(
  // render etmeye AuthenticationContext ile basladik ve App i children olarak verdik
  <AuthenticationContext>
    <App />
  </AuthenticationContext>


  // <div>  <React.StrictMode>
  //   {/* ApiProgress ve UserLoginPage arasinda bir parent child iliskisi kurduk
  //   UserLoginPage'i ApiProgress in bir child objesi gibi tanimladik
  //   bunun avantaji artik ApiProgress icerisinde UserLoginPage i render edip parametre verebiliriz */}
  //   {/* <ApiProgress>
  //     <UserSignUpPage />
  //   </ApiProgress>

  //   <LanguageSelector /> */}
  // </React.StrictMode></div>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
