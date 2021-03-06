import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { Authentication } from '../shared/AuthenticationContext';
// withRouter ile ProfileCard icerisine Router dan gelen property leri ekliyoruz, bunu userPage'de kullanacagiz, userName path gibi bilgileri
const ProfileCard = (props) => {

    const { username: loggedInUsername } = useSelector(store => ({ username: store.username }));
    const routeParams = useParams();

    const { user } = props;
    const { username, displayName, image } = user;

    const pathUsername = routeParams.username;
    let message = 'we cannot edit';
    if (pathUsername === loggedInUsername) {
        message = 'we can edit';
    }
    return (
        <div className="card">
            <h3>
                <div className="card-body text-center">{displayName}@{username}</div>
            </h3>
        </div>
    );


};

// class ProfileCardContextWrapper extends React.Component {
//     static contextType = Authentication;
//     render() {
//         return (
//             <ProfileCard {...this.props} userName={this.context.statre.userName}>
//             </ProfileCard>
//         );
//     }
// }

// const mapStateToProps = (store) => {
//     return {
//         loggedInUsername: store.userName,
//     };
// };

export default ProfileCard;