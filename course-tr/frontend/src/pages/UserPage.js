import React, { Component } from 'react';
import ProfileCard from '../components/ProfileCard';

// App den aldigimiz userName property sini ProfileCard a tasidik
const UserPage = (props) => {
    return (
        <div className='container'>
            <ProfileCard userName = {props.userName}/>
        </div>
    );
}

export default UserPage;