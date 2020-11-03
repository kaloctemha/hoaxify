import React from 'react';
import logo from '../assets/hoaxify.png';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logOutSuccess } from '../redux/authActions';
// burada direk olarak AuthenticationContext.js'deki Authentication objesinin kendisini import ediyoruz,
// komple class i degil

const TopBar = (props) => {
    // Lifting State Up yaparak bu property leri App.js e tasidik
    // state = {
    //     userName: 'user1',
    //     isLoggedIn: false
    //   };

    // 'render props' yontemini daha basit gostermenin bir yolu alttaki gibi
    // bu component'in (topBar) context tipinin Authentication oldugunu soylersek  
    // Authentication.Consumerile sarmamiza gerek kalmaz
    // Sadece class tipindeki componentlerde gecerli bir yazim tarzi
    //static contextType = Authentication;

    // _________ authActions.js e tasindi _____________
    // onClickLogOut = () =>{
    //     const action = {
    //         type : 'logout-success'
    //     }
    //     // biz burada bir action dispatch ediyoruz ve bu aksiyon bir reducer'a dusmeli
    //     // index.js de yazdigimiz reducer a hit edecek
    //     this.props.dispatch(action);
    // }

    // dispatch'e verecegimiz action fonksiyonunu authActions.js modulune tasidik
    // dispatch isini mapDispatchToProps ile property olarak verdik burayi iptal ettik
    // onClickLogOut = () => {
    //     this.props.dispatch(onLogOutSuccess());
    // }

    const { t } = useTranslation();

    const reduxState = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn,
        userName: store.userName
    }));
    const { userName, isLoggedIn } = reduxState;

    const dispatch = useDispatch();

    const onLogOutSuccess = () => {
        dispatch(logOutSuccess());
    };

    // useDispatch e donduk bu uctu
    // const {onLogOutSuccess } = props;


    // Authentication.Consumer : Authentication.Provider'daki datalara erisebilen componentler donucez
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
                    <Link className="nav-link" to={`/user/${userName}`}>
                        {userName}
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

// redux'daki state(store diye tanimlanan) bilgisini, TopBar'a property olarak
// alacagimiz bir function yaziyoruz. Bu fonksiyonu(mapStateToProps) Redux, "connect"
//  araciligiyla cagiracak 
// const mapStateToProps = (store) => {
//     return {
//         isLoggedIn: store.isLoggedIn,
//         userName: store.userName
//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         onLogOutSuccess: () => dispatch(onLogOutSuccess())
//     }
// }
// redux in connect objesi
export default TopBar;