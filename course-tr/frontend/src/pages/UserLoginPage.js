import React, { Component } from 'react';
import Input from '../components/Input';
import { login } from '../api/apiCalls';
import { withTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';


class UserLoginPage extends React.Component {

    state = {
        username: null,
        password: null,
        error: null
    };

    // React in componentlerinin lifecycle'inda sayfa yuklenirken bu method cagirliyor.
    // bunu ApiProgress.js e tasiyip hem Login hem Signup icin kullandik
    // componentDidMount(){
    //     axios.interceptors.request.use( request => {
    //         this.setState({pendingAPICall : true});
    //         console.log("pendingApiCall set to :" + this.state.pendingAPICall);
    //         return  request;
    //     });

    //     axios.interceptors.response.use(
    //         response => {
    //             this.setState({pendingAPICall : false});
    //             console.log("pendingApiCall set to :" + this.state.pendingAPICall);
    //             return response;
    //         },
    //         error => {
    //             this.setState({pendingAPICall : false});
    //             throw error;
    //         });
    // }



    onChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: null });
    };

    onClickLogin = async event => {
        event.preventDefault();
        const { username, password } = this.state;
        const creds = { username, password };
        const { push } = this.props.history;
        const { onLoginSuccess } = this.props;
        this.setState({ error: null }); // kullanici click yaptiktan sonra cevap gelene kadar hata mesajini(unauthrised) ortadan kaldiralim
        try {
            await login(creds);
            push('/'); // login basarili ise homePage e dondurmeye calisiyoruz
            onLoginSuccess(username);
        } catch (apiError) {

            this.setState({
                error: apiError.response.data.message
            });

        }
    };

    render() {
        // ApiProgress'de clone yapildi, o nedenle bu class'a pendingAPICall property olarak geliyor, props'dan alabiliriz
        const { t, pendingAPICall } = this.props;
        const { username, password, error } = this.state;
        const buttonEnabled = username && password;

        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>{t('Login')}</h1>
                    {/* Input bizim yazdigimiz component, input (basta kucuk i ile yazilan) react'in kendi componenti */}
                    <Input name="username" label={t('username')} onChange={this.onChange} />
                    <Input name="password" label={t('Password')} onChange={this.onChange} type="password" />
                    {/* hata mesajini eksrana bastirmak icin bir div ekliyoruz */}
                    {this.state.error && <div className="alert alert-danger" role="alert">
                        {this.state.error}</div>}
                    <div className="text-center">
                        <ButtonWithProgress
                            onClick={this.onClickLogin}
                            disabled={!buttonEnabled || pendingAPICall}
                            pendingAPICall={pendingAPICall}
                            text={t('Login')}
                        />
                    </div>
                </form>
            </div>
        );
    }
}


const UserLoginPageWithTranslation = withTranslation()(UserLoginPage);


// Her Node Module'un (bu olusturdugumuz file bir Node Module'dur) bir tane class veya fonksiyonu
// EXPORT etmesi beklenir ki bu Node Module' u index.js'de kullanabilelim
export default withApiProgress(UserLoginPageWithTranslation, '/api/1.0/auth');

