import React from 'react';

function UserItem(props) {
    const { id, name, email, salary, isGoldClient, imgPath, deleteUser} = props;

    return (
        <div>
            
            <h3>{name}</h3>
            <p>{id}</p>
            <p>{email}</p>
            <p>{salary}</p>
            <img src={imgPath} alt=''></img>
            { isGoldClient
                ? <h3>Client GOLD</h3>
                : null
            }
            <button onClick={(id) => deleteUser(id)}>Delete User</button>
        </div>
    );
}

export default UserItem;