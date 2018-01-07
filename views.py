
def views():
    @app.route('/login', methods=['POST','GET'])
    def do_admin_login():
        if request.method=='POST':
            if request.form['username'] in users and request.form['password'] == users.get(request.form['username']):
               global login
               login=True

               return 'login=True'
            return 'login=False'
        return '<h1>Login</h1>'
    return 
