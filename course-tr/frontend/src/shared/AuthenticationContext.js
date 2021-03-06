import React, { Component } from 'react';
import TopBar from '../components/TopBar';

export const Authentication = React.createContext();

// Uygulama genelinde authentication ile alakali butun bilgileri burada tutacagiz
class AuthenticationContext extends Component {

    state = {
        username: "user1",
        isLoggedIn: true,
        dislpayName: undefined,
        image: undefined,
        password: undefined
    };

    onLoginSuccess = authState => {
        this.setState(
            {
                ...authState,
                isLoggedIn: true
            }
        )
    };

    onLogOutSuccess = (username) => {
        this.setState(
            {
                username: undefined,
                isLoggedIn: false
            }
        )
    }

    render() {

        return (
            <Authentication.Provider value={{ state: { ...this.state },
                                            onLoginSuccess : this.onLoginSuccess,
                                            onLogOutSuccess : this.onLogOutSuccess}}>
                {this.props.children}
            </Authentication.Provider>
        );
    }
}

export default AuthenticationContext;