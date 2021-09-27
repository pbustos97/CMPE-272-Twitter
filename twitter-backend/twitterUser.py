import json

class TwitterUser():
    def __init__(self, api):
        self.user = api

    # tweetId is string only
    def delete_tweet(self, tweetId):
        if not tweetId:
            raise Exception("tweetId is empty")
        r = self.user.request('statuses/destroy/:%d' % int(tweetId))
        if r.status_code == 200:
            return r.json()
        raise Exception("Error while deleting tweet " + str(tweetId) + ": " + str(r.status_code))

    # message is string input
    def post_tweet_text(self, message):
        if not message:
            raise Exception("Cannot tweet an empty message")
        r = self.user.request('statuses/update', { 'status': message })
        if r.status_code == 200:
            return r.json()
        raise Exception("Error while posting tweet: " + str(r.status_code))

    def retrieve_timeline_tweets(self, count=5):
        r = self.user.request('statuses/home_timeline', {'count':count})
        if r.status_code == 200:
            return r.json()
        raise Exception("Could not retrieve Timeline tweets:" + str(r.status_code))

    # screen_name must be a twitter handle, if no input returns self
    def retrieve_user_tweets(self, screen_name=None, count=5):
        r = None
        if screen_name == None:
            r = self.user.request('statuses/user_timeline', {'count':count})
        else:    
            r = self.user.request('statuses/user_timeline', {'screen_name': screen_name, 'count':count})
        if r.status_code == 200:
            return r.json()
        raise Exception("Could not retrieve User tweets:" + str(r.status_code))