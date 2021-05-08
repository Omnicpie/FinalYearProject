from github import Github
import subprocess as cmd
import base64
import mysql.connector
from datetime import datetime

#uploads data to table specified in shop
def uploadSQL(shop, data):
   #connects to DB
    mydb = mysql.connector.connect(
      host="",
      user="",
      password="",
      database=""
    )# DETAILS REMOVED FOR SECURITY
    
    cursor = mydb.cursor()
    #deletes all data currently available in the shop
    clear = "DELETE FROM "+shop
    cursor.execute(clear)
    #the base sql for inserting products into the shop table
    sql = "INSERT INTO "+shop+"(url, product_name, product_price, product_additionals) VALUES "

    count = 0
    #goes through each products and insets it into shop
    #then adds to count of products inserted
    for i in data:
        if (i != ""):
         complete = sql + i
         try:
            cursor.execute(complete)
         except Exception as e:
            ttty = e
         count = count + 1
    #updates the last modified table to be now
    lastMod = "UPDATE last_modified SET date=NOW() WHERE shop='"+shop+"'"  
    cursor.execute(lastMod, shop)
    #commits products to the db, if anypoint above fails then nothing is changed in the db for that shop
    mydb.commit()
    #prints the shop and the number of products inserted to the node logs
    print(shop, "| ",count, " record(S) inserted")

#logs into the github here products are automatically stored
g = Github('') #DETAILS REMOVED FOR SECURITY

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

#gets git blob content as other methods can encounter a data limit.
aldi = base64.b64decode(repo.get_git_blob(aldiSha).content).decode("utf-8").split("\n")
tesco = base64.b64decode(repo.get_git_blob(tescoSha).content).decode("utf-8").split("\n")
sains = base64.b64decode(repo.get_git_blob(sainsSha).content).decode("utf-8").split("\n")
asda = base64.b64decode(repo.get_git_blob(asdaSha).content).decode("utf-8").split("\n")
coop = base64.b64decode(repo.get_git_blob(coopSha).content).decode("utf-8").split("\n")

#Prints the first product in each shop to guarentee loaded.
print(aldi[0])
print(tesco[0])
print(sains[0])
print(asda[0])
print(coop[0])

#updates each of the product tables for each store.
uploadSQL("asda", asda)
uploadSQL("tesco", tesco)
uploadSQL("sainsburys", sains)
uploadSQL("aldi", aldi)
uploadSQL("coop", coop)