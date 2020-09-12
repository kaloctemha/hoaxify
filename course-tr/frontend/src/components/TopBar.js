import React, { Component } from 'react';
import logo from '../assets/hoaxify.png';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
// burada direk olarak AuthenticationContext.js'deki Authentication objesinin kendisini import ediyoruz,
// komple class i degil
import { Authentication } from '../shared/AuthenticationContext';

class TopBar extends Component {
    // Lifting State Up yaparak bu property leri App.js e tasidik
    // state = {
    //     username: 'user1',
    //     isLoggedIn: false
    //   };

    // 'render props' yontemini daha basit gostermenin bir yolu alttaki gibi
    // bu component'in (topBar) context tipinin Authentication oldugunu soylersek  
    // Authentication.Consumerile sarmamiza gerek kalmaz
    static contextType = Authentication;

    render() {
        const { t } = this.props;
        // Authentication.Consumer : Authentication.Provider'daki datalara erisebilen componentler donucez
        
        const { state, onLogOutSuccess } = this.context;
        const { isLoggedIn, username } = state;
        let links = (
            <ul className="navbar-nav ml-auto">
                <li>
                    <Link className="nav-link" to="/login">
                        {t("Login")}
                    </Link>
                </li>

                <li>
                    <Link className="nav-link" to="/signup">
                        {t("Sign Up")}
                    </Link>
                </li>
            </ul>
        );

        if (isLoggedIn) {
            links = (
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Link className="nav-link" to={`/user/${username}`}>
                            {username}
                        </Link>
                    </li>

                    <li className="nav-link" onClick={onLogOutSuccess} style={{ cursor: 'pointer' }}>
                        {t('Logout')}
                    </li>
                </ul>
            );
        }
        return (
            <div className="shadow-sm bg-light mb-3">
                <nav className="navbar navbar-light container navbar-expand">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="60" alt="Hoxify Logo" />
                        Hoaxify
                    </Link>
                    {links}
                </nav>
            </div>
        );
    }
}
export default withTranslation()(TopBar);