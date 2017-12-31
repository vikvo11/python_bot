from flask import Flask
from misck import token
import requests
import json

#app = Flask(__name__)
URL='https://api.telegram.org/bot{}/'.format(token)

def write_json(data,filename='answer.json'):
    with open(filename,'w') as f:
        json.dump(data,f,indent=2,ensure_ascii=False)

def main():
    r=requests.get(URL+'getMe')
    write_json(r.json)
    print (r.json())





if __name__ =='__main__':
    main()
