import React, { Component } from 'react';
import axios from 'axios';


function getDisplayName(WrappedComponent){
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

// ApiProgresss'i  _HIGHER_ORDER_COMPONENT_ haline getirdik ve bir func seklinde export ediyoruz.
// Bunu withTranslation gibi olsun diye yaptik, App.js'de UserSignUp ve Login page lerini, ApiProgress'in
// child objesi gibi yazmak zorunda kalmamak icin.
export function withApiProgress(WrappedComponent, apiPath) {
    return class extends Component {
        // String template :  back tick `` icerisinde yapilir <-- 
        static displayName = `ApiProgress(${getDisplayName(WrappedComponent)})`;

        //static displayName = 'ApiProgress (' + getDisplayName(WrappedComponent) +')';

        state = {
            pendingAPICall: false
        }
        componentDidMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                console.log('Running req interceptor', apiPath);
                this.updateApiCallFor(request.url, true);
                return request;
            });

            this.responseInterceptor = axios.interceptors.response.use(
                response => {
                    this.updateApiCallFor(response.config.url, false);
                    return response;
                },
                error => {
                    this.updateApiCallFor(error.config.url, false);
                    throw error;
                });
        }

        // mount edilen interceptor in ID sini eject ile siliyoruz ki her requestte bunlari
        // tutmasin memory leak sorunu yaratmasin
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.request.eject(this.responseInterceptor);
        }

        updateApiCallFor = (url, inProgress) => {
            if (url == apiPath) {
                this.setState({ pendingAPICall: inProgress });
            }
        };

        render() {
            const { pendingAPICall } = this.state;
            // return (
            //     Buradaki pendingAPICall property'sini child componente(UserLoginpage'e) soyle gondeririz
            //     <div> {React.cloneElement(this.props.children, { pendingAPICall })} </div>
            // );
            // {... this.props}  -->  spread operator, this icindeki butun key/value lari pasliyoruz
            // Eger bir higher-order-component olusturuyorsak, sardigimiz component'a butun propertyleri
            // pasladigimizdan emin olmaliyiz
            return <WrappedComponent pendingAPICall = {pendingAPICall} {... this.props}/>
        }
    }

}