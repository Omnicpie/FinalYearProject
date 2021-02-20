from github import Github
import subprocess as cmd
import base64
import mysql.connector
from datetime import datetime


def uploadSQL(shop, data):


    mydb = mysql.connector.connect(
      host="localhost",
      user="ryan",
      password="p0K8c&5B5KiY",
      database="eshop"
    )
    #print(type(prodsInput))
    cursor = mydb.cursor()
    clear = "DELETE FROM "+shop
    cursor.execute(clear)
    sql = "INSERT INTO "+shop+"(url, product_name, product_price, product_additionals) VALUES "

    #complete = sql + prodsInput
    count = 0
    for i in data:
        #print(i)
        if (i != ""):
         complete = sql + i
         #print(complete)
         try:
            cursor.execute(complete)
         except Exception as e:
            #print(e)
            ttty = e
         count = count + 1
    lastMod = "UPDATE last_modified SET date=NOW() WHERE shop='"+shop+"'"  
    cursor.execute(lastMod, shop)
    mydb.commit()
    print(shop, "| ",count, " record(S) inserted")

g = Github('c8cdca51b807bd38105cb5d4012ac1d738664bc1')

repo = g.get_user().get_repo("FinalYearProds")
d = repo.get_contents("")
for i in d:
    if(i.path == "aldiProds.txt"):
       aldiSha = i.sha
    
    if(i.path == "tescoProds.txt"):
       tescoSha = i.sha
    
    if(i.path == "asdaProds.txt"):
       asdaSha = i.sha
    
    if(i.path == "sainsProds.txt"):
       sainsSha = i.sha
        
    if(i.path == "coopProds.txt"):
       coopSha = i.sha

aldi = base64.b64decode(repo.get_git_blob(aldiSha).content).decode("utf-8").split("\n")
tesco = base64.b64decode(repo.get_git_blob(tescoSha).content).decode("utf-8").split("\n")
sains = base64.b64decode(repo.get_git_blob(sainsSha).content).decode("utf-8").split("\n")
asda = base64.b64decode(repo.get_git_blob(asdaSha).content).decode("utf-8").split("\n")
coop = base64.b64decode(repo.get_git_blob(coopSha).content).decode("utf-8").split("\n")

print(aldi[0])
print(tesco[0])
print(sains[0])
print(asda[0])
print(coop[0])


uploadSQL("asda", asda)
uploadSQL("tesco", tesco)
uploadSQL("sainsburys", sains)
uploadSQL("aldi", aldi)
uploadSQL("coop", coop)