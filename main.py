from flask import Flask
from misck import token
import requests
#app = Flask(__name__)
URL='https://api.telegram.org/bot{}/'.format(token)
def main():
    r=requests.get(URL+'getMe')
    
    print (r.json())





if __name__ =='__main__':
    main()
