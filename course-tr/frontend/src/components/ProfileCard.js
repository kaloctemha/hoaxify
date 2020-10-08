import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import { Authentication } from '../shared/AuthenticationContext';
// withRouter ile ProfileCard icerisine Router dan gelen property leri ekliyoruz, bunu userPage'de kullanacagiz, userName path gibi bilgileri
const ProfileCard = (props) => {
    const pathUsername = props.match.params.userName;
    let message = 'we cannot edit';
    if (pathUsername === props.loggedInUsername) {
        message = 'we can edit';
    }
    return (
        <div>
            {message}
        </div>
    )
};

// class ProfileCardContextWrapper extends React.Component {
//     static contextType = Authentication;
//     render() {
//         return (
//             <ProfileCard {...this.props} userName={this.context.state.userName}>
//             </ProfileCard>
//         );
//     }
// }

const mapStateToProps = (store) => {
    return {
        loggedInUsername: store.userName,
    };
};

export default connect(mapStateToProps)(withRouter(ProfileCard));