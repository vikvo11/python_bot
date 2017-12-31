from flask import Flask
from misck import token,chat_id_old
import requests
import json

app = Flask(__name__)
URL='https://api.telegram.org/bot{}/'.format(token)

def write_json(data,filename='answer.json'):
    with open(filename,'w') as f:
        json.dump(data,f,indent=2,ensure_ascii=False)

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

    @app.route('/')
    def index():
    return'<h1>Hello Bot!</h1>'
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
    #main()
    app.run()
