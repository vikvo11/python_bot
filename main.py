from flask import Flask
from misck import token,chat_id_old
from flask import request
from flask import jsonify
from flask_sslify import SSLify

from flask.ext.httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

from flask import Flask, flash, redirect, render_template, request, session, abort

import requests
import json
import re

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

#@auth.get_password
#def get_password(username):
#    if username == 'vorovik':
#        return 'python'
#    return None
#
#@auth.error_handler
#def unauthorized():
#    return make_response(jsonify({'error': 'Unauthorized access'}), 401)

@app.route('/')
def home():
    if not session.get('logged_in'):
        return render_template('login.html')
    else:
        return "Hello Boss!"

@app.route('/login', methods=['POST','GET'])
def do_admin_login():
    if request.form['password'] == 'python' and request.form['username'] == 'vorovik':
        session['logged_in'] = True
        r='<h1>Session=True</h1>'
        #get_password('vorovik')
    else:
        flash('wrong password!')
    #return home()
    return '<h1>Session=True</h1>  '+r

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
#@auth.login_required
def test():
    r='<h2>{}</h2>'.format(last_msg)
    return r
    #return '<h2>Test</h2>'

def main():
    pass
    #print ('hi')




if __name__ =='__main__':
    main()
    #app.run('0.0.0.0',port=5000)
