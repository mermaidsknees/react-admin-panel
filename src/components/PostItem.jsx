import React from 'react';
import './PostItem.css'

function PostItem(props) {
    const { title, body } = props;

    return (
        <div className='post-item'>
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    );
}

export default PostItem;