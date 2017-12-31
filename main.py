from flask import Flask
from misck import token,chat_id
import requests
import json

#app = Flask(__name__)
URL='https://api.telegram.org/bot{}/'.format(token)

def write_json(data,filename='answer.json'):
    with open(filename,'w') as f:
        json.dump(data,f,indent=2,ensure_ascii=False)

def get_updates():
    url=URL+'getUpdates'
    #print(url)
    r=requests.get(url)
    write_json(r.json())

def send_message(chatId=488735610,text='Please wait a few seconds'):
    url=URL+'sendMessage'
    answer = {'chat_id': chatId, 'text': text} #словарь
    print(answer)
    #r=request.get(url,json=answer)
    #return r.json()
def main():
    #r=requests.get(URL+'getMe')
    #write_json(r.json())
    #print (r.json())
    #get_updates()
    send_message()




if __name__ =='__main__':
    main()
