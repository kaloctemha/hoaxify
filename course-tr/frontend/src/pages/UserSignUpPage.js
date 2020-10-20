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

    const [userName, setUserName] = useState();
    const [displayName, setDisplayName] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [errors, setErrors] = useState({});

    const onChange = event => {
        const { name, value } = event.target;
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

        // this.setState({ [name]: value, errors });
    };

    const onClickSignUp = async event => {
        event.preventDefault();
        const { history, dispatch } = props;
        const { push } = history;
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
            }
        }
    };

    const { userName: userNameError, displayName: displayNameError, password: passwordError, passwordRepeat: passwordRepeatError } = errors;
    const { t, pendingAPICall } = props;

    return (
        <div className='container'>
            <form>
                <h1 className='text-center'>{t('Sign Up')}</h1>
                <Input name = "userName" label={t('Username')} error={userNameError} onChange={onChange} />
                <Input name="displayName" label={t('Display Name')} error={displayNameError} onChange={onChange} />
                <Input name="password" label={t('Password')} error={passwordError} onChange={onChange} type="password" />
                <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeatError} onChange={onChange} type="password" />

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