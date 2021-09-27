import { FaTimes } from 'react-icons/fa';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserPage from './UserPage';

function Tweet({tweet, onDelete}) {
    const user = {
        'name': "jfakljdl",
        'screen_name': "saintpat97",
    }
    
    return (
            <div className='tweet'>
            <Link to={{pathname: `/users/${tweet.user.screen_name}`}}> {tweet.user.screen_name} </Link>
                <p>{tweet.text}</p>
            {user.screen_name === tweet.user.screen_name && 
                <div>
                    <button onClick={() => onDelete(tweet.id_str)}>Delete Tweet</button>
                </div>
            }
            </div>
    )
}

export default Tweet
