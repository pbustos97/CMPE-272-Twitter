import React, { useEffect, useState }from 'react';
import { useLocation, Link } from 'react-router-dom';
import Tweets from './Tweets';
import Tweet from './Tweet';
import { v4 as uuidv4 } from 'uuid';

function UserPage(props) {
    const twitterAPI = 'https://api.twitter.com/1.1/users/show.json'

    const [userData, setUserData] = useState(null);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const data = await fetch(`http://127.0.0.1:5000/api/user/${props.match.params.screen_name}`);

        const tweets = await data.json();
        console.log(tweets);
        setTweets(tweets)
    }

    const deleteTweet = async (id) => {
        const res = await fetch(`http://127.0.0.1:5000/api/delete/${id}`, {
            method: 'POST',
        });
        if (res.ok) {
            setTweets(tweets.filter((tweet) => tweet.id !== id));
        } else {
            console.log(res)
        }
    }

    return ( 
        <div>
            <div className='profile-name'>
                <h1>Username</h1>
            </div>
            <div className="tweets">
                {tweets.length > 0 ? <Tweets tweets={tweets} onDelete={deleteTweet}/> : 'No Tweets'}
            </div>
        </div>
    )
}

export default UserPage
