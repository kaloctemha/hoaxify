import React from 'react';
import { withRouter } from 'react-router-dom';
// withRouter ile ProfileCard icerisine Router dan gelen property leri ekliyoruz, bunu userPage'de kullanacagiz, username path gibi bilgileri
const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    const loggedInUsername = props.username;
    let message = 'we cannot edit';
    if (pathUsername === loggedInUsername) {
        message = 'we can edit';
    }
    return (
        <div>
            {message}
        </div>
    );
};

export default withRouter(ProfileCard);