import React, { useState, useEffect } from 'react';
import { getUsers } from '../api/apiCalls';
import { useTranslation } from 'react-i18next'
import UserListItem from "./UserListItem";
import { useApiProgress } from '../shared/ApiProgress';


// class Item extends Component {

//     state = {
//         userName: undefined
//     }

//     componentDidMount() {
//         this.setState({ userName: this.props.user.userName });
//     }

//     render() {
//         const { userName } = this.state;
//         return (
//             <div> {userName}
//                 <button onClick={this.props.onDelete}>Delete</button></div>
//         )
//     }
// }

const UserList = () => {

    const [page, setPage] = useState({
        content: [],
        size: 3,
        number: 0

    });

    const pendingApiCall = useApiProgress('/api/1.0/users?page');

    useEffect(() => {
        loadUsers();
    }, []); // buraya bos array [] vermek demek, sadece component mount edildiginde useEffect cagirilsin sonsuz donguye girmesin demek

    // state = {
    //     // backendden bize bir page objesi geliyor, user listesi content icerisinde,
    //     // gelen page in hangi sayfa numarasi oldugu number,
    //     // her sayfada kac user oldugu size
    //     // degerler undefined olmasin diye initial deger olarak 3 ve 0 verdik
    //     page: {
    //         content: [],
    //         size: 3,
    //         number: 0
    //     }
    // }

    // componentDidMount() {
    //     this.loadUsers();
    // };

    // onDeleteItem = index => {
    //     console.log('clicked delete for ', index);
    //     const users = [...this.state.users];
    //     users.splice(index, 1);
    //     this.setState({ users });
    // }

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    }

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    }

    const loadUsers = page => {
        getUsers(page).then(response => {
            setPage(response.data);
            // this.setState({
            //     page: response.data
            // });
        });
    }

    const { t } = useTranslation();
    const { content: users, last, first } = page;

    let actionDiv = (
        <div>
            {first === false && <button className="btn btn-sm btn-light float-left" onClick={onClickPrevious}>{t("Previous")}</button>}
            {last === false && <button className="btn btn-sm btn-light float-right" onClick={onClickNext}>{t("Next")}</button>}
        </div>
    );

    if (pendingApiCall) {
        actionDiv = (
            <div className="d-flex justify-content-center" >
                <div className="spinner-border text-black-50">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>)

        
    }
    return (
        <div className="card">
            <h3 className="card-header text-center">{t('Users')}</h3>
            <div className="list-group-flush">
                {
                    users.map(
                        (tmpUser) => (
                            <UserListItem key={tmpUser.username} user={tmpUser}></UserListItem>)
                    )
                }
            </div>
            <div>
            {actionDiv}
            </div>
        </div>);
}
export default UserList;