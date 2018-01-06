from flask.ext.httpauth import HTTPBasicAuth # For HTTP basic auth

users = {
    "vorovik": "python123",
    "susan": "bye"
}

def auth():
    auth = HTTPBasicAuth()
    @auth.get_password
    def get_pw(self,username):
        if username in users:
            return users.get(username)
        return None
    return auth
