# if 'flask run' does not work, 'export FLASK_APP=twitter.py'

from flask.globals import request
from secret.KeysAndTokens import APIKey, APIKeySecret, AccessToken, AccessTokenSecret
from twitterUser import TwitterUser
from twitterapi import createAPIAccess
from flask import Flask
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY

twitterUser = TwitterUser(createAPIAccess(APIKey, APIKeySecret, AccessToken, AccessTokenSecret))

@app.route('/api/user/<screen_name>', methods=['GET','POST'])
def apiUser(screen_name):
    tweetList = json.dumps(twitterUser.retrieve_user_tweets(str(screen_name)))
    return tweetList

@app.route('/api/timeline', methods=['GET'])
def apiTimeline():
    tweetList = json.dumps(twitterUser.retrieve_timeline_tweets())
    return tweetList

@app.route('/api/post', methods=['POST'])
def apiPost():
    data = request.json
    message = data['message']
    try:
        res = twitterUser.post_tweet_text(str(message))
        return res
    except Exception as e:
        return json.dumps({'error': str(e)})

@app.route('/api/delete/<tweetId>', methods=['POST'])
def apiDelete(tweetId):
    return twitterUser.delete_tweet(tweetId=tweetId)

if __name__ == "__main__":
    app.run(debug=True)