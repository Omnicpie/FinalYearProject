
# importing the multiprocessing module 
import multiprocessing 
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
import numpy
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

prodsFile = open("asdaProds.txt", "a")

def getSitemap():
    url = 'https://groceries.asda.com/sitemap-products.xml'
    req = urllib.request.Request(url)
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
            WebDriverWait(driver, 30).until(lambda d: d.find_element_by_class_name("pdp-main-details__title"))
            try:
                #get price
                price = driver.find_element_by_css_selector(".pdp-main-details__price").text
            except NoSuchElementException:
                price = "Unavailable"
            try: 
                #get name
                name = driver.find_element_by_css_selector(".pdp-main-details__title").text
            except NoSuchElementException:
                name = "No name data"
            try: 
                #get weight
                weight = driver.find_element_by_xpath("/html/body/div[1]/div[2]/section/main/div[2]/div[2]/div[1]/div[2]/span").text
            except NoSuchElementException:
                weight = "No weight data"
            x = url, name, price, weight
            
        except TimeoutException:
            x = url, "Product failed to load", 0, 0
        #print(x)
    except: 
        x = url, "Product failed to load", 0, 0
    return x

  
def collectData(name, urls):
    #start a webdriver for the process
    driver = webdriver.Firefox(options=options, executable_path=DRIVER_PATH)
    #iterate over products
    for i in urls:
        x = getProductInformation(driver, i)
        #write product information to file
        if(x[1] != "Product failed to load" and x[1] != "" and x[1] != "No name data"):
          if(x[2] != "" and x[2] != "Unavailable"):
            #print(str(name) + " | "+ str(x) )
            prodsFile.write(str(x)+ "\n")
          else:
            continue
        else:
            continue
    #close driver when done
    driver.quit()
    print(name, "| COLLECTION DONE ")
  
if __name__ == "__main__": 
    #Split products for multiprocessing (10 processors)
    l = numpy.array_split(numpy.array(getSitemap()),10)
    f = open("asda.txt", "w")
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
