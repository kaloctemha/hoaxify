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


class App extends React.Component {

  // Aslinda bu TopBar.java'da idi, Lifting State Up yaparak buraya tasidik.
  // Amacimiz Login oldugu bilgisini hem Topbar hem de LoginPage'de kullanmak
  // Simdi de AuthenticationContext e tasiyoruz ki surekli Lifting-State Up ile
  // tasimak zorunda kalmayalim
  // state = {
  //   username: undefined,
  //   isLoggedIn: false
  // };

  // onLoginSuccess = (username) => {
  //   this.setState(
  //     {
  //       username,
  //       isLoggedIn: true
  //     }
  //   )
  // };

  // onLogOutSuccess = (username) => {
  //   this.setState(
  //     {
  //       username: undefined,
  //       isLoggedIn: false
  //     }
  //   )
  // }

  render() {
    const isLoggedIn = false;
    const username = undefined;

    return (
      <div>
        {/* HashRouter : her sayfa acildiginda backende request atmasin, frontend icinde sayfa switchleri yapilsin 
        BrowserRouter'da her sayfada backend sorgulari yapiliyor, o daha karmasik bi yapi backend isleri gerekli*/}
        <Router>
        {/* AuthenticationContext'e ihtiyacimiz olan butun property leri verdigimiz icin
        artik TopBar'dan bunlari kaldirabiliriz cunku aritk bunlari App.js'de en tepede render etcez */}
          {/* <TopBar username={username} isLoggedIn={isLoggedIn} onLogOutSuccess={this.onLogOutSuccess} /> */}
          <TopBar/>
          {/* alttakilerden birini sec her sayfayi '/' a redirect etme */}
          <Switch>
            {/* React startswith ile calisir, o nedenle '/' gordugu her yerde HomePage gostermesin
        diye exact yazdik */}
            <Route exact path="/" component={HomePage} />


            {/* Eger user login olmussa browserdan '/login' adresine gitmek istendiginde Topbarda 
            login ve signup linkleri cikmasin diye !isLoggedIn ile sardik */}
            {!isLoggedIn && (<Route path="/login"
              component={
                (props) => {
                  // {...props} : spread operator ile App.js'deki butu property'leri 
                  // return ederken UserLoginPage'e pasladik ki history gibi ozellikleri aktaralim
                  // ayrica onLoginSuccess fonksiyonunu da bir property olarak UserLoginPage e verdik
                  return <UserLoginPage onLoginSuccess={this.onLoginSuccess} {...props} />
                }
              }
            />)
            }


            <Route path="/signup" component={UserSignUpPage} />

            {/* App deki username asagida Userpage'e property olarak verdik,sonra UserPage'den de profileCarda property olarak vericez */}
            <Route path="/user/:username"
              component={
                (props) => {
                  return <UserPage {...props} username={username}/>
                }
              } />

              {/* default */}
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
}

export default App;
