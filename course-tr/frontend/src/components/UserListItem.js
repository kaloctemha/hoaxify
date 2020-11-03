import React from 'react';
import defaultPic from '../assets/hoaxify.png';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
    const { user } = props;
    const { username, displayName, image } = user;
    let imageSource = defaultPic;
    if (image) {
        imageSource = image;
    }
    return (
        <Link to={`/user/${username}`}
            className="list-group-item list-group-item-action">
            <img clasName="rounded-circle" witdh="32" height="32" alt={'${username} profilePic'} src={imageSource} />
            <span className="pl-2"> {displayName}@{username} </span>
        </Link>
    );
};

export default UserListItem;