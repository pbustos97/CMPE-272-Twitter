import { useState } from 'react';

const PostTweet = () => {
    const [message, setTweet] = useState('');
    const [author, setAuthor] = useState('saintpat97')
    const [isPending, setIsPending] = useState('false');

    const handleSubmit = (e) => {
        const tweet = {message, author};
        console.log(tweet)
        setIsPending(true);
        e.preventDefault();
        fetch('http://127.0.0.1:5000/api/post', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(tweet),
        }).then(() => {
            console.log('message added');
            setIsPending(false);
        })
    }

    return (
        <div className="post-tweet">
            <h2> Post Tweet </h2>
            <form onSubmit={handleSubmit}>
                <label>Tweet content</label>
                <input type="text"
                required
                value={message}
                onChange={(e) => setTweet(e.target.value)}/>
                {message.length < 140 && <button>Post Tweet</button>}
                {message.length > 140 && <button disabled>Tweets need less than 140 characters</button>}
            </form>
        </div>
    )
}

export default PostTweet