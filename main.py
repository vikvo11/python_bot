from flask import Flask
from misck import token,chat_id_old
from flask import request
from flask import jsonify
from flask_sslify import SSLify

from data import Articles

from flask.ext.httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()



from flask import Flask, flash, redirect, render_template, request, session, abort

import requests
import json
import re

global login
login=False
global last_msg
last_msg=''
Articles = Articles()
#https://api.telegram.org/bot521265983:AAFUSq8QQzLUURwmCgXeBCjhRThRvf9YVM0/setWebhook?url=https://vorovik.pythonanywhere.com/
app = Flask(__name__)
app.debug = True
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


def get_price(crypto):
    url='https://api.coinmarketcap.com/v1/ticker/{}/'.format(crypto)
    r = requests.get(url).json()
    price = r[-1]['price_usd']
    return price

users = {
    "vorovik": "python123",
    "susan": "bye"
}

@auth.get_password
def get_pw(username):
    if username in users:
        return users.get(username)
    return None

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/articles')
def articles():
    return render_template('articles.html',articles=Articles)

@app.route('/log')
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
        if request.form['username'] in users and request.form['password'] == users.get(request.form['username']):
           global login
           login=True

           return 'login=True'
        return 'login=False'
    return '<h1>Login</h1>'



@app.route('/webhook/',methods=['POST','GET'])
def webhook():
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

        global last_msg
        last_msg=json.dumps(r,ensure_ascii=False)

        return jsonify(r)
    return '<h1>Hello bot</h1>'

@app.route('/last_msg/',methods=['POST','GET'])
@auth.login_required
#curl -u vorovik:python123 -i https://vorovik.pythonanywhere.com/last_msg/
def tes():
    r='<h2>{}</h2>'.format(last_msg)
    return r

def main():
    pass
    #print ('hi')




if __name__ =='__main__':
    main()
    #app.run('0.0.0.0',port=5000)
