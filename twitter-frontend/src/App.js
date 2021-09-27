import logo from './logo.svg';
import './index.css';
import Header from './components/Header';
import Tweets from './components/Tweets';
import PostTweet from './components/Post';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import UserPage from './components/UserPage';

function App() {
  const [showAddTweet, setShowAddTweet] = useState(true)
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    fetchData();
}, [])

const fetchData = async () => {
    const data = await fetch('http://127.0.0.1:5000/api/timeline');

    const tweets = await data.json();
    console.log(tweets);
    setTweets(tweets)
}

  // Delete Tweet
  const deleteTweet = async (id) => {
    await fetch(`http://127.0.0.1:5000/api/delete/${id}`, {
        method: 'POST',
    })
    setTweets(tweets.filter((tweet) => tweet.id !== id))
  }

  // Post Tweet
  const postTweet = async (message) => {
    await fetch(`http://127.0.0.1:5000/api/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message }),
    })
  }

  const PageNotFound = () => {
    <div>
      404!
    </div>
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
        <Route exact path = '/'>
          <PostTweet />
          <div className="tweets">
            {tweets.length > 0 ? <Tweets tweets={tweets} onDelete={deleteTweet}/> : 'No Tweets'}
          </div>
        </Route>
        <Route exact path='/users/:screen_name' component={UserPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
