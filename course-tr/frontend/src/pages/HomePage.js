import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';



class HomePage extends Component {
    render() {

        const {t} = this.props;
        return (
            <div className = 'contanier'>
                {t('Home Page')}
            </div>
        );
    }
}

export default withTranslation()(HomePage);