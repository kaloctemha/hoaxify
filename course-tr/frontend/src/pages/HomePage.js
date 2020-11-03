import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import UserList from '../components/UserList'


const HomePage = () => {
    return <div className='container'><UserList></UserList></div>;
};

export default HomePage;