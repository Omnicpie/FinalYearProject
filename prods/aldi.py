
# importing the multiprocessing module 
import multiprocessing 
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import numpy
import json
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import NoSuchElementException, TimeoutException, UnexpectedAlertPresentException

DRIVER_PATH = '/home/ryan/Downloads/geckodriver'

options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")
options.add_argument("--remote-debugging-port=9222")
options.add_argument('log-level=2')
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0")
prodsFile = open("aldiProds.txt", "a")

def getSitemap(sitemap):
    #print(sitemap)
    hdr = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
       'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
       'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
       'Accept-Encoding': 'none',
       'Accept-Language': 'en-US,en;q=0.8',
       'Connection': 'keep-alive'}
    req = urllib.request.Request(url=sitemap, headers=hdr)
    resp = urllib.request.urlopen(req)
    respData = resp.read()
    tree = ET.fromstring(respData)
    products = []
    for x  in tree.getchildren():
        products.append(x[0].text)
    return products

def getProductInformation(driver, url):
    try:
        driver.get(url)
        try:
            #wait until page is fully loaded (upto 100seconds)
            WebDriverWait(driver, 30).until(lambda d: d.find_element_by_class_name("product-details__name"))
            try:
                #get price
                price = driver.find_element_by_css_selector(".product-price__value").text
            except NoSuchElementException:
                price = "Unavailable"
            try: 
                #get name
                name = driver.find_element_by_css_selector(".product-details__name").text
            except NoSuchElementException:
                name = "No name data"
            try: 
                #get weight
                weight = driver.find_element_by_css_selector(".product-price__detail").text
            except NoSuchElementException:
                weight = "No weight data"
            x = url, name, price, weight
        except (TimeoutException, UnexpectedAlertPresentException) as e:
            #print("Exceptions")
            #print(url, "| ", type(e), " ", e)
            x = url, "Product failed to load", 0, 0
        #print(x)
    except Exception as e:
        x = url, "Product failed to load", 0, 0
    return x

  
def collectData(name, urls):
    #start a webdriver for the process
    driver = webdriver.Firefox(options=options, executable_path=DRIVER_PATH)
    #iterate over products
    for i in urls:
        #print(i)
        x = getProductInformation(driver, i)
        #write product information to file
        ### CHANGE THIS TO SQL THING LATER 
        if(x[1] != "Product failed to load" and x[1] != "" and x[1] != "No name data"):
          if(x[2] != "" and x[2] != "Unavailable" and x[2] != "Product no longer available"):
            #print(str(name) + " | "+ str(x) )
            prodsFile.write(str(x)+ "\n")
          else:
            #print(str(name) + " | Product filtered: not written")
            d = "uwu"
        else:
            #print(str(name) + " | Product filtered: not written")
            d = "uwu"
    #close driver when done
    driver.quit()
    print(name, "| COLLECTION DONE ")
  
if __name__ == "__main__": 
    #Split products for multiprocessing (10 processors)
    l = []
    for i in range(12):
        smap = "https://www.aldi.co.uk/sitemap/product-en_gb-gbp-"+str(i)
        l.append(getSitemap(smap))
        #print(len(l[i]))
    f = open("aldis.txt", "w")
    f.write(str(l))
    f.close()
    #Give Processors their task and taskset
    p1 = multiprocessing.Process(target=collectData, args=("p1", l[0] + l[6]))
    p2 = multiprocessing.Process(target=collectData, args=("p2", l[1] + l[7]))
    p3 = multiprocessing.Process(target=collectData, args=("p3", l[2] + l[8]))
    p4 = multiprocessing.Process(target=collectData, args=("p4", l[3] + l[9]))
    p5 = multiprocessing.Process(target=collectData, args=("p5", l[4] + l[10]))
    p6 = multiprocessing.Process(target=collectData, args=("p6", l[5]+ l[11]))
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
    p11.start()
    p12.start()
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
    p11.join()
    p12.join()
  
    #  processes finished 
    print("Done!") 
    prodsFile.close()       
