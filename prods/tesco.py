
# importing the multiprocessing module 
import multiprocessing 
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import numpy
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException, TimeoutException

DRIVER_PATH = '/home/ryan/Downloads/geckodriver'

options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0")
options.add_argument('log-level=2')

prodsFile = open("tescoProds.txt", "a")

def getSitemap():
    driver = webdriver.Firefox(options=options, executable_path=DRIVER_PATH)
    driver.get("https://www.tesco.com/groceries/UK.en.pdp.sitemap.xml")
    content = driver.find_element_by_css_selector("urlset")
    soup = BeautifulSoup(content.text, "html.parser")
    string = soup.contents[0]
    products = string.split(" ")
    driver.quit()
    return products
    
def getProductInformation(driver, url):
    driver.get(url)
    try:
        #wait until page is fully loaded (upto 30seconds)
        WebDriverWait(driver, 30).until(lambda d: d.find_element_by_class_name("product-details-tile__title"))
        try:
            #get price
            price = driver.find_element_by_css_selector(".price-per-sellable-unit").text
        except NoSuchElementException:
            price = "Unavailable"
        try: 
            #get name
            name = driver.find_element_by_css_selector(".product-details-tile__title").text
        except NoSuchElementException:
            name = "No name data"
        try: 
            #get weight
            weight = driver.find_element_by_css_selector(".price-per-quantity-weight").text
        except NoSuchElementException:
            weight = "No weight data"
        x = url, name, price, weight
    except TimeoutException:
        x = url, "Product failed to load", 0, 0
    #print(x)
    return x

  
def collectData(name, urls):
    #start a webdriver for the process
    driver = webdriver.Firefox(options=options, executable_path=DRIVER_PATH)
    #iterate over products
    for i in urls:
        x = getProductInformation(driver, i)
        #write product information to file
        ### CHANGE THIS TO SQL THING LATER 
        if(x[1] != "Product failed to load" and x[1] != "" and x[1] != "No name data"):
          if(x[2] != "" and x[2] != "Unavailable"):
            #print(str(name) + " | "+ str(x) )
            prodsFile.write(str(x)+ "\n")
          else:
            #print(str(name) + " | Product filtered: not written")
            adasdadad = "uwuw"
        else:
            #print(str(name) + " | Product filtered: not written")
            adasdadad = "uwuw"
    #close driver when done
    driver.quit()
    print(name, "| COLLECTION DONE ")
  
if __name__ == "__main__": 
    #Split products for multiprocessing (10 processors)
    out= getSitemap()
    l = numpy.array_split(numpy.array(out[1:len(out)]),10)
    #print(len(l[0]))
    #print(len(l[9]))
    f = open("tesco.txt", "w")
    f.write(str(l))
    f.close()
    #Give Processors their task and taskset
    p1 = multiprocessing.Process(target=collectData, args=("p1", l[0]))
    p2 = multiprocessing.Process(target=collectData, args=("p2", l[1]))
    p3 = multiprocessing.Process(target=collectData, args=("p3", l[2]))
    p4 = multiprocessing.Process(target=collectData, args=("p4", l[3]))
    p5 = multiprocessing.Process(target=collectData, args=("p5", l[4]))
    p6 = multiprocessing.Process(target=collectData, args=("p6", l[5]))
    p7 = multiprocessing.Process(target=collectData, args=("p7", l[6]))
    p8 = multiprocessing.Process(target=collectData, args=("p8", l[7]))
    p9 = multiprocessing.Process(target=collectData, args=("p9", l[8]))
    p10 = multiprocessing.Process(target=collectData, args=("p10", l[9]))
    
    #start all processors
    p1.start()
    p2.start()
    p3.start()
    p4.start()
    p5.start()
    p6.start()
    p7.start()
    p8.start()
    p9.start()
    p10.start()
    # wait until process is done
    p1.join()
    p2.join()
    p3.join()
    p4.join()
    p5.join()
    p6.join()
    p7.join()
    p8.join()
    p9.join()
    p10.join()
  
    #  processes finished 
    print("Done!") 
    prodsFile.close()       
