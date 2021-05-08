import os
import datetime

def xd ():

	try:
		while True:
			startTime = datetime.datetime.now()
			if(os.path.exists("asdaProds.txt")):
				os.remove("asdaProds.txt")

			if(os.path.exists("sainsProds.txt")):
				os.remove("sainsProds.txt")

			if(os.path.exists("tescoProds.txt")):
				os.remove("tescoProds.txt")

			if(os.path.exists("aldiProds.txt")):
				os.remove("aldiProds.txt")

			if(os.path.exists("coopProds.txt")):
				os.remove("coopProds.txt")
			#runs coop scraper
			print("COOP")
			os.system('python3 coop.py')
			os.system("killall firefox")
			#runs tesco scraper
			print("TESCO")
			os.system('python3 tesco.py')
			os.system("killall firefox")
			#runs sainsbury's scraper
			print("SAINS")
			os.system('python3 sainsburys.py')
			os.system("killall firefox")
			#runs asda scraper
			print("ASDA")
			os.system('python3 asda.py')
			os.system("killall firefox")
			#runs aldi scraper
			print("ALDI")
			os.system('python3 aldi.py')
			os.system("killall firefox")

			endTime = datetime.datetime.now()
			timeTaken = endTime - startTime
			print("-----------------------------")
			print("time to complete: ", timeTaken)
			print("-----------------------------")
			if(os.path.exists("geckodriver.log")):
				os.remove("geckodriver.log")
			os.system('python3 gitHub.py')
	except (KeyboardInterrupt, IndentationError):
		#return 0
		pass
		
xd()
##TODO: WORK OUT MORRISONS AFTER ALL OF THESE WORK AND UPLOAD TO SQL
