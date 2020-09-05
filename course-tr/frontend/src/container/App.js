import React from 'react';
import LanguageSelector from '../components/LanguageSelector';
import ApiProgress from '../shared/ApiProgress';
import UserSignUpPage from '../pages/UserSignUpPage';
import UserLoginPage from '../pages/UserLoginPage';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import TopBar from '../components/TopBar';
// ACOLAK_LOG :  bu alttaki kisim 'html' e benziyor gibi gorunebilir 
// ancak JSX'dir, JavaScript için bir syntax uzantısıdır., 
// JSX, React elementleri üretir.


function App() {
  return (
    <div>
      {/* HashRouter : her sayfa acildiginda backende request atmasin, frontend icinde sayfa switchleri yapilsin 
      BrowserRouter'da her sayfada backend sorgulari yapiliyor, o daha karmasik bi yapi backend isleri gerekli*/}
      <Router>
        <TopBar />
        {/* alttakilerden birini sec her sayfayi '/' a redirect etme */}
        <Switch>
          {/* React startswith ile calisir, o nedenle '/' gordugu her yerde HomePage gostermesin
      diye exact yazdik */}
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={UserLoginPage} />
          <Route path="/signup" component={UserSignUpPage} />
          <Route path="/user/:username" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
      {/* <div className="col">
        <UserSignUpPage />
      </div>
      <div className="col">
        <UserLoginPage />
      </div> */}
      <LanguageSelector />
    </div>
  );
}

export default App;
