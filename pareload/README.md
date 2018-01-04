# pareload
####reload / refresh PythonAnywhere server from commandline

###How To Get pareload

    git clone https://github.com/a-y-s/pareload.git

This will clone the git repo into a directory called pareload.

###How To Use pareload

```
git clone https://github.com/a-y-s/pareload.git
cd pareload
./pareload
```
pareload needs your password to login to your account to refresh your webapp.

And that's it!

You can run 
    ```
    pa-refresh
    ``` from anywhere to refresh the webapp

To change your password,
    ```pa-pass -p <your PA password>```

The password is saved under ```~/.config/pareload/passkey```


you can specify a custom domain for your webapp as such
```pa-refresh -d <domain-name>```

###Requirements
  * [Mechanize](https://github.com/a-y-s/pareload.git)
> mechanize is already installed on pythonanywhere :D


###Need Help?
If you need help, email me at ayushjha6@gmail.com
