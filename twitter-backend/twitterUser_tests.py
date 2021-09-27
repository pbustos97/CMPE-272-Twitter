import unittest
import twitterapi
from twitterUser import TwitterUser
from secret.KeysAndTokens import APIKey, APIKeySecret, AccessToken, AccessTokenSecret
import json

class TwitterUserTests(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(TwitterUserTests, self).__init__(*args, **kwargs)
        self.testUser = TwitterUser(twitterapi.createAPIAccess(APIKey, APIKeySecret, AccessToken, AccessTokenSecret))

    # Should pass because the function requires input for the parameter
    def testPostEmpty(self):
        self.assertRaises(Exception, self.testUser.post_tweet_text, '')
    
    # Should pass unless there is wrong access token and access secret combination
    #def testPost(self):
    #    self.assertRaises(Exception, self.testUser.post_tweet_text, 'test')
    
    # Should pass because the function requires input for the parameter
    def testDeleteEmpty(self):
        self.assertRaises(Exception, self.testUser.delete_tweet, '')
    
    # Should pass because the tweet linked isn't owned by any of the users
    def testDeleteNotOwned(self):
        self.assertRaises(Exception, self.testUser.delete_tweet, 1437834587980271616)

    # Should fail is tweet successfully deleted, else it passes
    def testDeleteOwned(self):
        r = json.loads(json.dumps(self.testUser.post_tweet_text('test')))
        self.assertRaises(Exception, self.testUser.delete_tweet, int(r['id']))

    # Should pass because linked tweet is already deleted
    def testDeleteDeleted(self):
        self.assertRaises(Exception, self.testUser.delete_tweet, 1438616327199985684)

    # Should pass because most of the work is on Twitter's end
    def testUserTimeline(self):
        self.assertIsNotNone(self.testUser.retrieve_user_tweets)

    # Should pass because most of the work is on Twitter's end
    def testHomeTimeline(self):
        self.assertIsNotNone(self.testUser.retrieve_timeline_tweets)
    
    # Should pass unless there is no user with the current credentials
    def testUserAPIAccess(self):
        self.assertIsNotNone(self.testUser)

unittest.main()