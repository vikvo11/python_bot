from flask.ext.httpauth import HTTPBasicAuth # For HTTP basic auth

def auth():
    auth = HTTPBasicAuth()
    return auth
