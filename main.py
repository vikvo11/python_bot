from flask import Flask
from misck import token
import requests
#app = Flask(__name__)
URL='https://api.telegram.org/bot{}/'.format(token)
URLJenkins='http://admin:54e44e4e46a7929abb5f171d2ddc564c@35.177.112.94:8080/job/Send_msg/build --data-urlencode json='{"parameter": [{"name":"TOKEN", "value":"521265983:AAFUSq8QQzLUURwmCgXeBCjhRThRvf9YVM0"}, {"name":"CHAT_ID", "value":"488735610"}, {"name":"MSG", "value":"Sample\Plan"}]}''
def main():
    #r=requests.get(URL+'getMe')
    r=requests.get(URLJenkins)
    print (r.json())





if __name__ =='__main__':
    main()
