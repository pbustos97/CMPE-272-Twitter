from secret.KeysAndTokens import APIKey, APIKeySecret, AccessToken, AccessTokenSecret
from TwitterAPI import TwitterAPI

def createAPIAccess(APIKey, APISecret, AccessToken, AccessTokenSecret):
    return TwitterAPI(APIKey, APISecret, AccessToken, AccessTokenSecret)