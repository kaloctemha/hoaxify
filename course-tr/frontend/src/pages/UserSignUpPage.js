import React, { useEffect, useState } from 'react';
import { signUp } from '../api/apiCalls';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';
import { connect } from 'react-redux';
import { signUpHandler } from '../redux/authActions'


// Iki tip CONPONENT var :
//  1 - App.js'deki 'function' tipi - stateless (durum bilgisi tasimaz)
//  2 - Buradaki 'class' tipi - stateful (durum bilgisini 'form' bilgilerini tutup backende gondermek)


const UserSignUpPage = (props) => {

<<<<<<< HEAD
    const [form, setForm] = useState({
        userName: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
    });
    const [errors , setErrors] = useState({});

    // Comment-out for HOOKs usage
    // state = {

    // }

=======
    const [userName, setUserName] = useState();
    const [displayName, setDisplayName] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [errors, setErrors] = useState({});
>>>>>>> 10adcc2b604958cd1b439387f8eb1a58e121ce43

    const onChange = event => {
        const { name, value } = event.target;
<<<<<<< HEAD
        // const { t } = props;

        // JS 'spread operator' to copy object
        //const errorsCopy = { ...errors }

        // Bos bir field ile signup yaptiktan sonra, tekrar birseyler yazilmaya baslandiginda
        // hata mesajini silinmesi islemi icin
        //errorsCopy[name] = undefined;

        // if (name === 'password' || name === 'passwordRepeat') {
        //     if (name === 'password' && value !== form.passwordRepeat) {
        //         errorsCopy.passwordRepeat = t('Password Mismatch');
        //     } else if (name === 'passwordRepeat' && value !== form.password) {
        //         errorsCopy.passwordRepeat = t('Password Mismatch');
        //     } else {
        //         errorsCopy.passwordRepeat = undefined;
        //     }
        // }

        //setErrors(errorsCopy);
        setErrors((previousErrors) => ({ ...previousErrors, [name]: undefined }));
        // const formCopy = {...form};
        // formCopy[name] = value;
        // setForm(formCopy);
        // usttekini basitlestirdik
        setForm((previousForm) => ({ ...previousForm, [name]: value }));

        // // errors objesi icerisindeki hata mesaji da guncellenmis oluyor
=======
        const { t } = props;

        const errorsCopy = { ...errors };
        errorsCopy[name] = undefined;

        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== passwordRepeat) {
                errorsCopy.passwordRepeat = t('Password Mismatch');
            } else if (name === 'passwordRepeat' && value !== password) {
                errorsCopy.passwordRepeat = t('Password Mismatch');
            } else {
                errorsCopy.passwordRepeat = undefined;
            }
        }

        setErrors(errorsCopy);

>>>>>>> 10adcc2b604958cd1b439387f8eb1a58e121ce43
        // this.setState({ [name]: value, errors });
    };

    const onClickSignUp = async event => {
        event.preventDefault();
        const { history, dispatch } = props;
        const { push } = history;
<<<<<<< HEAD

        //object destructuring
        const { userName, displayName, password } = form;

        // JS diyor ki, bir JSON objesi uretirken key ve value icin isimlendirmeler ayni ise sadece birini kullanmaniz yeterli
=======
>>>>>>> 10adcc2b604958cd1b439387f8eb1a58e121ce43
        const body = {
            userName,
            displayName,
            password
        };
        try {
            await dispatch(signUpHandler(body));
            push('/');
        } catch (error) {
            if (error.response.data.validationErrors) {
<<<<<<< HEAD
                //this.setState({ errors: error.response.data.validationErrors });
                setErrors(error.response.data.validationErrors);
=======
>>>>>>> 10adcc2b604958cd1b439387f8eb1a58e121ce43
            }
        }
    };

<<<<<<< HEAD
    // onChangeUserName = (event) => {
    //     this.setState({userName : event.target.value});
    // };

    // onChangeDisplayName = (event) => {
    //     this.setState({displayName : event.target.value});
    // };

    // onChangePassword = (event) => {
    //     this.setState({password : event.target.value});
    // };

    // onChangePasswordRepeat = (event) => {
    //     this.setState({passwordRepeat : event.target.value});
    // };


    // setState() methodunu kullanarak biz aslinda React a 'state' i guncelledikten sonra tekrar
    // asagidaki 'render()' methodunu cagirmasini ve yeni degerleri kullanarak bize componentleri
    // tekrar gostermesini sagliyoruz
    // onChangeAgree = (event) => {
    //     this.setState({ agreedClicked : event.target.checked});
    // };


    // __________ MOVED TO  LanguageSelector.js __________
    // onChangeLangugage = language => {
    //     const { i18n } = this.props;
    //     i18n.changeLanguage(language);
    //     //changeLanguage method in apiCalls.js
    //     changeLanguage(language);
    // };



    // object destructuring
    //const { errors } = this.state;
    const { userName : userNameError, displayName : displayNameError, password : passwordError} = errors;
    const { t, pendingAPICall } = props;

    let passwordRepeatError;
    if(form.password != form.passwordRepeat){
        passwordRepeatError = t('Password Mismatch');
    }
    // ACOLAK_LOG :  bu alttaki kisim 'html' e benziyor gibi gorunebilir 
    // ancak JSX'dir, JavaScript için bir syntax uzantısıdır., 
    // JSX, React elementleri üretir.
=======
    const { userName: userNameError, displayName: displayNameError, password: passwordError, passwordRepeat: passwordRepeatError } = errors;
    const { t, pendingAPICall } = props;
>>>>>>> 10adcc2b604958cd1b439387f8eb1a58e121ce43

    return (
        <div className='container'>
            <form>
                <h1 className='text-center'>{t('Sign Up')}</h1>
<<<<<<< HEAD
                {/* Input bizim yazdigimiz component, input (basta kucuk i ile yazilan) react'in kendi componenti */}
                <Input name="userName"label={t('Username')} error={userNameError} onChange={onChange} />
                <Input name="displayName" label={t('Display Name')} error={displayNameError} onChange={onChange} />
                <Input name="password" label={t('Password')} error={passwordError} onChange={onChange} type="password" />
                <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeatError} onChange={onChange} type="password" />

                {/* <div>
                    <input type='checkbox' onChange={this.onChangeAgree} /> Agreed
                </div> */}
=======
                <Input name = "userName" label={t('Username')} error={userNameError} onChange={onChange} />
                <Input name="displayName" label={t('Display Name')} error={displayNameError} onChange={onChange} />
                <Input name="password" label={t('Password')} error={passwordError} onChange={onChange} type="password" />
                <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeatError} onChange={onChange} type="password" />
>>>>>>> 10adcc2b604958cd1b439387f8eb1a58e121ce43

                <div className="text-center">
                    <ButtonWithProgress
                        disabled={pendingAPICall || passwordRepeatError !== undefined}
                        pendingAPICall={pendingAPICall}
                        onClick={onClickSignUp}
                        text={t("Sign Up")}
                    />
                </div>
            </form>
        </div>
    );
}


const UserSignupPageWihApiProgress4SignUp = withApiProgress(UserSignUpPage, '/api/1.0/users');
const UserSignupPageWihApiProgress4SAuth = withApiProgress(UserSignupPageWihApiProgress4SignUp, '/api/1.0/auth');
const UserSignUpPageWithTranslation = withTranslation()(UserSignupPageWihApiProgress4SAuth);
export default connect()(UserSignUpPageWithTranslation);