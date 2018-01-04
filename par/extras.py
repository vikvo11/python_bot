import os

VERSION = '1.00'


class Extras:
    name = "high-cyril"
    passpath = os.environ['HOME']+"/.config/{0}/passkey".format(name)

extras = Extras()
