import React, { Component, useEffect, useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
// App den aldigimiz userName property sini ProfileCard a tasidik
const UserPage = (props) => {

    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);

    //const { username } = props.match.params.username;

    const { username } = useParams();

    useEffect(() => {
        setNotFound(false);
    }, [user]); // user objesi degisiyorsa notFound durumu ortadan kalkmis demektir, gelip burdan false a cekebiliriz

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) {
                setNotFound(true);
            }
        }
        loadUser();
    }, [username]); //props.match.params.username daki username her degistiginde bu effect tetiklensin

    if (notFound) {
        return (
            <div className='container'>
                <div className="alert alert-danger text-center" role="alert">
                    <div>
                        <span className="material-icons">
                            error
                        </span>
                    </div>
                    User Not Found
                </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <ProfileCard  user= {user}/>
        </div>
    );
}

export default UserPage;