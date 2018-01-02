from flask import Flask
from misck import token,chat_id_old
from flask import request
from flask import jsonify
from flask_sslify import SSLify

from flask.ext.httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash
import base64
auth = HTTPBasicAuth()
headers={
   'content-type': 'application/json',
   'Authorization': 'Basic %s' % base64.b64encode('vorovik:python123')
}

from flask import Flask, flash, redirect, render_template, request, session, abort

import requests
import json
import re

global login
login=False
global last_msg
last_msg=''

#https://api.telegram.org/bot521265983:AAFUSq8QQzLUURwmCgXeBCjhRThRvf9YVM0/setWebhook?url=https://vorovik.pythonanywhere.com/
app = Flask(__name__)
sslify=SSLify(app)
URL='https://api.telegram.org/bot{}/'.format(token)

def write_json(data,filename='answer.json'):
    with open(filename,'w') as f:
        json.dump(data,f,indent=2,ensure_ascii=False)


def get_updates():
    url=URL+'getUpdates'
    r=requests.get(url)
    write_json(r.json())
    return r.json()

def send_message(chatId,text='Please wait a few seconds...!'):
    url=URL+'sendMessage'
    answer = {'chat_id': chatId, 'text': text}
    print(answer)
    r=requests.get(url,json=answer)
    return r.json()

def parc_text(text):
    pattern = r'/\w+'
    crypto = re.search(pattern,text).group()
    return crypto[1:]
    #print(crypto)

def get_price(crypto):
    url='https://api.coinmarketcap.com/v1/ticker/{}/'.format(crypto)
    r = requests.get(url).json()
    price = r[-1]['price_usd']
    return price

users = {
    "vorovik": "python123",
    "susan": "bye",
    "test": generate_password_hash("test")
}

@auth.get_password
def get_pw(username):
    if username in users:
        return users.get(username)
    return None

#@auth.error_handler
#def unauthorized():
#    return make_response(jsonify({'error': 'Unauthorized access'}), 401)

@app.route('/')
def home():
    global login
    login=False
    if not session.get('logged_in'):
        return render_template('login.html')
    else:
        return "Hello Boss!"

@app.route('/login', methods=['POST','GET'])
def do_admin_login():
    if request.method=='POST':
        #chat_id='488735610'
        #text= request.form['password'] +' '+request.form['username']
        #send_message(chat_id,text)
        #if request.form['password'] == 'python' and request.form['username'] == 'vorovik':
        if request.form['username'] in users: #and request.form['password'] == users.get(request.form['username']):
           global login
           login=True

           #@auth.verify_password
           #def verify_password(username, password):
             #  if request.form['username'] in users:
                  # return check_password_hash(users.get(request.form['username']),password)
              # return False

           #get_password(request.form['username'])
           #@auth.get_password(request.form['password'])

           #get_pw(request.form['username'])
               #return request.form['password']
               response = self.app.post(
            'https://vorovik.pythonanywhere.com/last_msg/,
            data=',
            headers=headers,
            follow_redirects=True
        )
           return 'login=True'
           #return redirect(url_for('/last_msg'))
        #return jsonify(chat_id)
        return 'login=False'
    return '<h1>Login</h1>'



@app.route('/webhook/',methods=['POST','GET'])
def index():
    if request.method=='POST':
        r = request.get_json()
        write_json(r)
        chat_id=r['message']['chat']['id']
        text=r['message']['text']
        write_json(text)
        pattern =r'/\w+'
        if re.search(pattern,text):
            price = get_price(parc_text(text))
            send_message(chat_id,price)
        #return 'ok'

        global last_msg
        last_msg=json.dumps(r,ensure_ascii=False)

        return jsonify(r)
    return '<h1>Hello bot</h1>'

@app.route('/last_msg/',methods=['POST','GET'])
@auth.login_required
def tes():
    r='<h2>{}</h2>'.format(last_msg)
    return r
    #return "Hello, %s!" % auth.username()

def main():
    pass
    #print ('hi')




if __name__ =='__main__':
    main()
    #app.run('0.0.0.0',port=5000)
