
from data import Version

class lastCD:
    """docstring for ."""
    def __init__(self,shema):
        #super(, self).__init__()
        self.shema = shema
        self.version_uat= version[-1][self.shema]               #curUat.execute("select (CD) from %s.audit_patches",[self.shema])
        self.version_prod= version[0][self.shema]               #curProd.execute("select (CD) from %s.audit_patches",[self.shema])
        self.info= self.shema+' UAT='+self.version_uat+' PROD='+self.version_prod
# import from data file -> #print(version[0]['CAR_OWNER'])
version=Version()
base=[
lastCD('CAR_OWNER'),
lastCD('CRDS_OWNER'),
lastCD('STG_OWNER')
]

#CAR_OWNER=lastCD('CAR_OWNER')
#CRDS_OWNER=lastCD('CRDS_OWNER')
#CAR_OWNER=lastCD('STG_OWNER')

for i in base:
    print(i.info)
