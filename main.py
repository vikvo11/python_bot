from flask import Flask
from misck import token,chat_id_old
from flask import request
from flask import jsonify
from flask_sslify import SSLify

import requests
import json
import re


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

@app.route('/',methods=['POST','GET'])
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
        return jsonify(r)
    return '<h1>Hello bot</h1>'

def main():
    pass
    #print ('hi')




if __name__ =='__main__':
    main()
    #app.run('0.0.0.0',port=5000)
