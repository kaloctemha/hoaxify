import { useState, useEffect } from 'react';
// import React, { Component } from 'react';
import axios from 'axios';


// apiProgress i higher order component olarka impl etmistik, simdi kendi Hook umuzu yaratacagiz
export const useApiProgress = (apiPath) => {
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        let requestInterceptor, responseInterceptor;

        const updateApiCallFor = (url, inProgress) => {
            if (url.startsWith(apiPath)){
                setPendingApiCall(inProgress);
            }
        };

        const registerIntercepters = () => {
            requestInterceptor = axios.interceptors.request.use(request => {
                console.log('Running req interceptor', apiPath);
                updateApiCallFor(request.url, true);
                return request;
            });

            responseInterceptor = axios.interceptors.response.use(
                response => {
                    updateApiCallFor(response.config.url, false);
                    return response;
                },
                error => {
                    updateApiCallFor(error.config.url, false);
                    throw error;
                });
        }

        const unregisterInterceptors = () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.request.eject(responseInterceptor);
        }
    
        registerIntercepters();
    
        return function unmount (){
            unregisterInterceptors();
        };
    }, []); // bos array [] vererek useEffect in sayfadaki her degisimde cagirilmasini engelledik, yoksa zilyon kere cagiriliyordu

    return pendingApiCall;
}


// HOOK yaratip bunu komple iptal ettik
// function getDisplayName(WrappedComponent) {
//     return WrappedComponent.displayName || WrappedComponent.name || 'Component';
// }

// ApiProgresss'i  _HIGHER_ORDER_COMPONENT_ haline getirdik ve bir func seklinde export ediyoruz.
// Bunu withTranslation gibi olsun diye yaptik, App.js'de UserSignUp ve Login page lerini, ApiProgress'in
// child objesi gibi yazmak zorunda kalmamak icin.

// HOOK yaratip bunu komple iptal ettik
// export function withApiProgress(WrappedComponent, apiPath) {
//     return class extends Component {
//         // String template :  back tick `` icerisinde yapilir <-- 
//         static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;

//         //static displayName = 'ApiProgress (' + getDisplayName(WrappedComponent) +')';

//         state = {
//             pendingAPICall: false
//         }
//         componentDidMount() {
//             this.registerIntercepters();
//         }

//         // mount edilen interceptor in ID sini eject ile siliyoruz ki her requestte bunlari
//         // tutmasin memory leak sorunu yaratmasin
//         componentWillUnmount() {
//             this.unregisterInterceptors();
//         }

//         registerIntercepters = () => {
//             this.requestInterceptor = axios.interceptors.request.use(request => {
//                 console.log('Running req interceptor', apiPath);
//                 this.updateApiCallFor(request.url, true);
//                 return request;
//             });

//             this.responseInterceptor = axios.interceptors.response.use(
//                 response => {
//                     this.updateApiCallFor(response.config.url, false);
//                     return response;
//                 },
//                 error => {
//                     this.updateApiCallFor(error.config.url, false);
//                     throw error;
//                 });
//         }

//         unregisterInterceptors = () => {
//             axios.interceptors.request.eject(this.requestInterceptor);
//             axios.interceptors.request.eject(this.responseInterceptor);
//         }




//         render() {
//             const { pendingAPICall } = this.state;
//             // return (
//             //     Buradaki pendingAPICall property'sini child componente(UserLoginpage'e) soyle gondeririz
//             //     <div> {React.cloneElement(this.props.children, { pendingAPICall })} </div>
//             // );
//             // {... this.props}  -->  spread operator, this icindeki butun key/value lari pasliyoruz
//             // Eger bir higher-order-component olusturuyorsak, sardigimiz component'a butun propertyleri
//             // pasladigimizdan emin olmaliyiz
//             return <WrappedComponent pendingAPICall={pendingAPICall} {... this.props} />
//         }
//     }

// }