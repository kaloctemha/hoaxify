import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress} from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../redux/authActions';

// import { Authentication } from '../shared/AuthenticationContext';

const UserLoginPage = (props) => {


    // Hooks kullanimi icin class tipindeki component'i yukarida func tipine cevirdik ve artik state'e ihtiyacimiz yok   
    //class UserLoginPage extends Component {
    //static contextType = Authentication;
    // state = {
    //     userName: null,
    //     password: null,
    //     error: null
    // };

    // useState() - useEffect() - useContext()   <--- Bunlar hep Hook
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    // Normalde login sayfasinda biz hatali bir mesaj aldiktan sonra ekrana bir sey yazdigimizda altta cikan hatayi (yani error'u)
    // temizliyorduk, Hooks ile bunu nasil yapariz? "useEffect" kullanarak. verilen dizideki fieldlarda bir update gerceklesirse,
    // arrow function ile gonderdigimiz method'u calistir diyoruz
    useEffect(() => { setError(undefined)}, [username, password]);

    // redux disoatch yerine Hook dispatch i kullandik
    const dispatch =  useDispatch();


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



    // Hooks kullanarak setUsername/setPassword gibi methodlari asagida componentlerin icerisinde arrow func olarak tanimladik, bu onChange bosa cikti
    // const onChange = event => {
    //     const { name, value } = event.target;
    //     //this.setState({ [name]: value, error: null });
    // };

    const onClickLogin = async event => {
        event.preventDefault();
        //const { userName, password } = this.state;
        const creds = { username, password };
        const { history} = props;
        const { push } = history;
        setError(undefined);
        //this.setState({ error: null }); // kullanici click yaptiktan sonra cevap gelene kadar hata mesajini(unauthrised) ortadan kaldiralim
        try {
            // apicall ve dispatch islemlerini configureStore.js'de tek func'da birlestirdik
            await dispatch(loginHandler(creds));
            push('/'); // login basarili ise homePage e dondurmeye calisiyoruz
            // ...response.data icerisinde userName, displayname ve image zaten gelecek 
            // tek tek authState e eklemedik
        } catch (apiError) {
            setError(apiError.response.data.message);
            // console.log(apiError);
            // this.setState({
            //     error: apiError.response.data.message
            // });
        }
    };

    // render () {}  --> Hooks icin func tipinde componente cevirdigimizden artik render diye bir seye ihtiyac kalmadi

    // ApiProgress'de clone yapildi, o nedenle bu class'a pendingAPICall property olarak geliyor, props'dan alabiliriz
    // const {pendingAPICall } = props;

    const pendingAPICall = useApiProgress('/api/1.0/auth');
    const { t } = useTranslation();
    const buttonEnabled = username && password;

    return (
        <div className='container'>
            <form>
                <h1 className='text-center'>{t('Login')}</h1>
                <Input label={t('Username')} onChange={event => setUsername(event.target.value)} />
                <Input label={t('Password')} onChange={event => setPassword(event.target.value)} type="password" />
                {/* hata mesajini eksrana bastirmak icin bir div ekliyoruz */}
                {error && <div className="alert alert-danger"> {error}</div>}
                <div className="text-center">
                    <ButtonWithProgress
                        onClick={onClickLogin}
                        disabled={!buttonEnabled || pendingAPICall}
                        pendingAPICall={pendingAPICall}
                        text={t('Login')}
                    />
                </div>
            </form>
        </div>
    );

}

// useTranslation Hook unu kullanarak t fonsiyonunu cektik ve alttaki gibi
// withTranslation ile sarmamiza gerek kalmadi
// const UserLoginPageWithTranslation = withTranslation()(UserLoginPage);

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onLoginSuccess: (authState) => dispatch(loginSuccess(authState))
//     };
// }


// useDispatch Hook u ile connect'i replace ettik
//export default connect()(withApiProgress(UserLoginPage, '/api/1.0/auth/'));

export default UserLoginPage;

// Her Node Module'un (bu olusturdugumuz file bir Node Module'dur) bir tane class veya fonksiyonu
// EXPORT etmesi beklenir ki bu Node Module' u index.js'de kullanabilelim