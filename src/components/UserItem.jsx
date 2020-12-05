import React from 'react';
import './UserItem.css'

function UserItem(props) {
    const { id, name, email, salary, isGoldClient, imgPath, deleteUser} = props;

    return (
            <div className='user-item'>
            
            <img src={imgPath} alt=''></img>
            {/* <p>{id}</p> */}
            <div className='info-box'>
                <h3>{name}</h3>
                <p>{email}</p>
                <p>{salary}</p>
                { isGoldClient
                    ? <h3>Client GOLD</h3>
                    : null
                }
                <button class='deleteButton' onClick={(x) => deleteUser(x)}>Delete User</button>
            </div>
           
        </div>
    );
}

export default UserItem;