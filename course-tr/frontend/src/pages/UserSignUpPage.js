import React from 'react';
import { signUp  } from '../api/apiCalls';
import Input from '../components/Input';
import { withTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';


// Iki tip CONPONENT var :
//  1 - App.js'deki 'function' tipi - stateless (durum bilgisi tasimaz)
//  2 - Buradaki 'class' tipi - stateful (durum bilgisini 'form' bilgilerini tutup backende gondermek)


class UserSignUpPage extends React.Component {

    state = {
        username: null,
        //agreedClicked: false
        displayName: null,
        password: null,
        passwordRepeat: null,
        errors: {}
    }

    onChange = event => {

        // const value = event.target.value;
        // const name = event.target.name;

        // object destructuring
        const { name, value } = event.target;
        const { t } = this.props;

        // JS 'spread operator' to copy object
        // Bos bir field ile signup yaptiktan sonra, tekrar birseyler yazilmaya baslandiginda
        // hata mesajini silinmesi islemi icin
        const errors = { ... this.state.errors }

        errors[name] = undefined;

        if (name == 'password' || name == 'passwordRepeat') {
            if (name == 'password' && value != this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password Mismatch');
            } else if (name == 'passwordRepeat' && value != this.state.password) {
                errors.passwordRepeat = t('Password Mismatch');
            } else {
                errors.passwordRepeat = undefined;
            }
        }

        // errors objesi icerisindeki hata mesaji da guncellenmis oluyor
        this.setState({ [name]: value, errors });
    };

    // Axios diye bir paket yukledik (>> npm instal axios), post requestlerini bu tool u kullanarak gondericez
    onClickSignUp = async event => {
        event.preventDefault();

        //object destructuring
        const { username: username, displayName, password } = this.state;

        // JS diyor ki, bir JSON objesi uretirken key ve value icin isimlendirmeler ayni ise sadece birini kullanmaniz yeterli
        const body = {
            username: username,
            displayName,
            password
        };

        // SignUp butonuna basildiginda islem bitene kadar birden cok kez basilmasini onlemek
        // icin pendingAPICall diye bir degisken tanimladik ve kontrol ederek butonu disable edicez
        // ___________ApiProgress e tasindi___________
        //this.setState({ pendingAPICall: true });

        // alttaki path gosterimi aslinda kullanissiz bir yontem, her seferinde gelip buraya IP:Port degistirmek buyuk is,
        // bunu webpack proxy ile kullanisli hale getircez
        // axios.post('http://localhost:8080/api/1.0/users/', body);

        // alttaki gibi yaptigimizda ise request webpack'e gider ve port olmadigi icin webpack backend'e gitmeden 404 doner
        // istedigimiz port'a gondermesi icin webpack'de porxy ayari yapmamiz lazim
        // package.json dosyasi altina proxy satiri ekledik : "proxy" : "http://localhost:8080"
        // bu sayede artik webpack bizim attigimiz req leri nereye gonderecegini biliyor
        //  CHROME (Browser)   --->   WEBPACK (React Project Dev. Server)    -->    Spring Boot (Backend)


        // 'then' ve 'catch' li yontem yerine, icinde bulundugumuz onClickSignUp() methodunu
        // async yaparak 'then' case'ini await fonksiyonuyla, catch i ise try-catch in catch i ile
        // yakalayabiliriz
        try {
            const response = await signUp(body);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errors: error.response.data.validationErrors });
            }
            // gelen hata mesajini yakalayip ekrana koymak istiyoruz
        }

        // signUp(body)
        //     .then((response) => {  }) // success case
        //     .catch((error) => {
        //         if (error.response.data.validationErrors) {
        //             this.setState({ errors: error.response.data.validationErrors });
        //         }
        //       }); // fail case

        // ___________ApiProgress e tasindi___________
        // this.setState({ pendingAPICall: false })

        // " ../api/apiCalls/signUp "
        // signUp(body)
        //     .then((response) => { this.setState({ pendingAPICall: false }) }) // success case
        //     .catch((error) => { this.setState({ pendingAPICall: false }) }); // fail case

        // bu 'then' ve 'catch' li yonteme PROMISE deniyo
        // Iki durumda da FALSE olacaksa neden direk setlemedik de then/catch leri yazdik?
        // post methodu asenkron calisiyor, cevabi beklemeden alt satira gecer,
        // callback fonksiyonlarini yazdik ki cevap gelmeden devam etmesin 
    };

    // onChangeUserName = (event) => {
    //     this.setState({username : event.target.value});
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

    render() {

        // object destructuring
        const {errors } = this.state;
        const { username, displayName, password, passwordRepeat } = errors;
        const { t , pendingAPICall} = this.props;
        // ACOLAK_LOG :  bu alttaki kisim 'html' e benziyor gibi gorunebilir 
        // ancak JSX'dir, JavaScript için bir syntax uzantısıdır., 
        // JSX, React elementleri üretir.

        return (
            <div className='container'>
                <form>
                    <h1 className='text-center'>{t('Sign Up')}</h1>
                    {/* Input bizim yazdigimiz component, input (basta kucuk i ile yazilan) react'in kendi componenti */}
                    <Input name="username" label={t('Username')} error={username} onChange={this.onChange} />
                    <Input name="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange} />
                    <Input name="password" label={t('Password')} error={password} onChange={this.onChange} type="password" />
                    <Input name="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} onChange={this.onChange} type="password" />

                    {/* <div>
                    <input type='checkbox' onChange={this.onChangeAgree} /> Agreed
                </div> */}

                    <div className="text-center">
                        <ButtonWithProgress
                            disabled={pendingAPICall || passwordRepeat != undefined}
                            pendingAPICall = {pendingAPICall}
                            onClick={this.onClickSignUp}
                            text =  {t("Sign Up")}
                        />
                    </div>
                    
                    {/* <div>  __________ MOVED TO  LanguageSelector.js _________
                        <img src="https://www.countryflags.io/tr/flat/24.png"
                            alt="Turkish Flag"
                            onClick={() => this.onChangeLangugage('tr')}
                            style={{ cursor: 'pointer' }}>
                        </img>

                        <img src="https://www.countryflags.io/us/flat/24.png"
                            alt="USA flag"
                            onClick={() => this.onChangeLangugage('en')}
                            style={{ cursor: 'pointer' }}>
                        </img>

                    </div> */}
                </form>
            </div>
        );
    }
}



// Translation edipmis bir UserSignUpPage'i import ediyoruz, dil destegi icin
// index.js'de import edilen de bu customized edilmis olan oluyor
// Bu isleme HIGHER ORDER COMPONENT deniyor, kendi component'imizi baska bir component'in icine ekleyerek,
// oradan bazi ozellikler kazanmak seklinde dusunulebilir
const  UserSignupPageWihApiProgress = withApiProgress(UserSignUpPage,'/api/1.0/users');

// _HIGHER_ORDER_COMPONENT_ mantigini kullanarak ustte translation, burada da apiProgress ozelligini
// export edecegimiz node module u zenginlestirdik
const UserSignUpPageWithTranslation = withTranslation()(UserSignupPageWihApiProgress);

// Her Node Module'un (bu olusturdugumuz file bir Node Module'dur) bir tane class veya fonksiyonu
// EXPORT etmesi beklenir ki bu Node Module' u index.js'de kullanabilelim
export default UserSignUpPageWithTranslation;