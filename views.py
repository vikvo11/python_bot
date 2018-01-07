
def views():
    #Login
    @app.route('/login', methods=['POST','GET'])
    def do_admin_login():
        if request.method=='POST':
            if request.form['username'] in users and request.form['password'] == users.get(request.form['username']):
               global login
               login=True

               return 'login=True'
            return 'login=False'
        return '<h1>Login</h1>'
    #Return
    return

def views1():
    #Add_articles
    @app.route('/add_article', methods=['GET','POST'])
    @is_logged_in
    def add_article():
        form = ArticleForm(request.form)
        if request.method =='POST' and form.validate():
            title = form.title.data
            body = form.body.data
            #Create cursor
            cur = mysql.connection.cursor()
            #Execute query
            cur.execute("INSERT INTO articles(title,author,body) VALUES(%s,%s,%s)",(title,session['username'],body))
            #Commit ot db
            mysql.connection.commit()
            #Close connection
            cur.close()
            flash('You are now added a new one article','success')
            return redirect(url_for('dashbord'))
        return render_template('add_article.html',form=form)
    return
