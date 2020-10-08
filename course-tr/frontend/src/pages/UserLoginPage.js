import React, { Component } from 'react';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { loginHandler } from '../redux/authActions';

// import { Authentication } from '../shared/AuthenticationContext';

class UserLoginPage extends Component {
    //static contextType = Authentication;
    state = {
        userName: null,
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
        const { userName, password } = this.state;
        const creds = { userName, password };
        const { history, dispatch } = this.props;
        const { push } = history;
        this.setState({ error: null }); // kullanici click yaptiktan sonra cevap gelene kadar hata mesajini(unauthrised) ortadan kaldiralim
        try {
            // apicall ve dispatch islemlerini configureStore.js'de tek func'da birlestirdik
            await dispatch(loginHandler(creds));
            push('/'); // login basarili ise homePage e dondurmeye calisiyoruz
            // ...response.data icerisinde userName, displayname ve image zaten gelecek 
            // tek tek authState e eklemedik
        } catch (apiError) {
            // console.log(apiError);
            // this.setState({
            //     error: apiError.response.data.message
            // });
        }
    };

    render() {
        // ApiProgress'de clone yapildi, o nedenle bu class'a pendingAPICall property olarak geliyor, props'dan alabiliriz
        const { t, pendingAPICall } = this.props;
        const { userName, password, error } = this.state;
        const buttonEnabled = userName && password;

        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>{t('Login')}</h1>
                    {/* Input bizim yazdigimiz component, input (basta kucuk i ile yazilan) react'in kendi componenti */}
                    <Input name="userName" label={t('userName')} onChange={this.onChange} />
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

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onLoginSuccess: (authState) => dispatch(loginSuccess(authState))
//     };
// }

export default connect()(withApiProgress(UserLoginPageWithTranslation, '/api/1.0/auth/'));

// Her Node Module'un (bu olusturdugumuz file bir Node Module'dur) bir tane class veya fonksiyonu
// EXPORT etmesi beklenir ki bu Node Module' u index.js'de kullanabilelim