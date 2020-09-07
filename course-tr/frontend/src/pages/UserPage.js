import React, { Component } from 'react';
import ProfileCard from '../components/ProfileCard';

// App den aldigimiz username property sini ProfileCard a tasidik
const UserPage = (props) => {
    return (
        <div className='container'>
            <ProfileCard username = {props.username}/>
        </div>
    );
}

export default UserPage;