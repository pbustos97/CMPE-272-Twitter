import Tweet from './Tweet'

function Tweets({tweets, onDelete}) {

    return (
        <>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} onDelete={onDelete} />
            ))}
        </>
    )
}

export default Tweets
