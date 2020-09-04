import React from 'react';
import LanguageSelector from '../components/LanguageSelector';
import ApiProgress from '../shared/ApiProgress';
import UserSignUpPage from '../pages/UserSignUpPage';
import UserLoginPage from '../pages/UserLoginPage';

// ACOLAK_LOG :  bu alttaki kisim 'html' e benziyor gibi gorunebilir 
// ancak JSX'dir, JavaScript için bir syntax uzantısıdır., 
// JSX, React elementleri üretir.


function App() {
  return (
    <div className="row">
      <div className="col">
        <UserSignUpPage />
      </div>
      <div className="col">
        <UserLoginPage />
      </div>
      <LanguageSelector />
    </div>
  );
}

export default App;
