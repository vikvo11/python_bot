from flask import Flask
from misck import token,chat_id_old
from flask import request
from flask import jsonify
from flask_sslify import SSLify

import requests
import json
#global last_update_id
#last_update_id=0

app = Flask(__name__)
sslify=SSLify(app)
URL='https://api.telegram.org/bot{}/'.format(token)

def write_json(data,filename='answer.json'):
    k=k+1
    with open(filename,'w') as f:
        json.dump(data,f,indent=2,ensure_ascii=False)
    with open('test_'+filename,'a') as t:
        t.write('hi'+str(k))

def get_updates():
    url=URL+'getUpdates'
    #print(url)
    r=requests.get(url)
    write_json(r.json())
    return r.json()

def send_message(chatId,text='Please wait a few seconds...!'):
    url=URL+'sendMessage'
    answer = {'chat_id': chatId, 'text': text}
    print(answer)
    r=requests.get(url,json=answer)
    return r.json()

@app.route('/',methods=['POST','GET'])
def index():
    if request.method =='POST':
        r=json.loads(request.data)
        write_json(r)
        chat_id=r['message']['chat']['id']
        text=r['message']['text']
    #update_id=r['message']['update_id']
        if 'bitcoin' in text:
            send_message(chat_id,text+'- dorogoi'+str(update_id))

            return r.json()
    return '<h1>Test flask app!</h1><h2>Ypa!</h2>'

def main():
    #r=requests.get(URL+'getMe')
    #write_json(r.json())
    #print (r.json())
    #get_updates()
    #send_message(chat_id)
    #r = get_updates()
    #print (r)
    #chat_id=r['result'][-1]['message']['chat']['id']
    #text=r['result'][-1]['message']['text']
    #print (str(chat_id)+' '+text)
    pass





if __name__ =='__main__':
    main()
    #app.run('0.0.0.0',port=5000)
