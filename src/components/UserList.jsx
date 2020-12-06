import React from 'react';
import UserItem from './UserItem';

function UserList(props) {
    const { users } = props;
    const {deleteUser} = props; //functions


    return (
        <div className='user-container'>
            {/* <h2>Lista utilizatorilor:</h2> */}
            { users.map((user, index) => {
                return <UserItem
                    // adaugam prop-ul id componentei UserItem
                    id={user.id}
                    name={user.name}
                    email={user.email}
                    isGoldClient={user.isGoldClient}
                    salary={user.salary}
                    imgPath={user.imgPath}
                    deleteUser={(id) => deleteUser(user.id)}
                    key={index}
                />
            })}
        </div>
    );
}

export default UserList;