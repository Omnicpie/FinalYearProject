import mysql.connector, sys, json, os, re, itertools
import importlib
script = importlib.import_module("script")
mydb = mysql.connector.connect(
  host="localhost",
  user="api",
  password="eshopAPI%pass1",
  database="eshop"
)

##  ARGS----- FILE, ASDA, COOP, TESCO, ALDI, SAINS, DELIVERY

def searchBestFromShops(items, shops):
    output = [[], [], [], [], []]
    #
    if(shops[0] == "1"):
        for item in items:
            if(item["shop"] == "asda"):
                output[0].append(item)
                break
    if(shops[1] == "1"):
        for item in items:
            if(item["shop"] == "coop"):
                output[1].append(item)
                break
    if(shops[2] == "1"):
        for item in items:
            if(item["shop"] == "tesco"):
                output[2].append(item)
                break
    if(shops[3] == "1"):
        for item in items:
            if(item["shop"] == "aldi"):
                output[3].append(item)
                break
    if(shops[4] == "1"):
        for item in items:
            if(item["shop"] == "sains"):
                output[4].append(item)
                break
    return output

def findBestBasket(items, delivery, shops):
    prods = []
    terms = []
    minPrice = 10000
    bestBasket = {} 
    for i in items:
        prods.append(i[0])
        terms.append(i[1])
    try:
        #only asda
        if(shops[0] == "1" and (shops[1] == "0" or shops[1] == "1" ) and (shops[2] == "0" or shops[2] == "1" ) and (shops[3] == "0" or shops[3] == "1" ) and (shops[4] == "0" or shops[4] == "1" )):
            goingTotal = 0
            items = []
            allPres = True
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    price = item[0][0]["product_price"]
                    items.append({"term": terms[index], "found": True, "item": item[0][0]})
                    goingTotal += float(re.search("[0-9.]+", price).group())
                else:
                    items.append({"term": terms[index], "found": False, "item": {"url": "", "shop": "", "product_name": "Not Found", "product_price": "", "product_additionals": ""}})
                    allPres = False
            if goingTotal < 40.00 and delivery == "1":
                goingTotal += 3.00
            goingTotal = round(goingTotal, 2)
            if goingTotal < minPrice and allPres  and len(items) == len(terms):
                minPrice = goingTotal
                bestBasket = {"items": items, "total": minPrice}
        #only coop
        if((shops[0] == "0" or shops[0] == "1" ) and shops[1] == "1" and (shops[2] == "0" or shops[2] == "1" ) and (shops[3] == "0" or shops[3] == "1" ) and (shops[4] == "0" or shops[4] == "1" )):
            goingTotal = 0
            items = []
            for item in prods:
                index = prods.index(item)
                if item[1]: 
                    price = item[1][0]["product_price"]
                    items.append({"term": terms[index], "found": True, "item": item[1][0]})
                    goingTotal += float(re.search("[0-9.]+", price).group())
                else:
                    items.append({"term": terms[index], "found": False, "item": {"url": "", "shop": "", "product_name": "Not Found", "product_price": "", "product_additionals": ""}})
                    allPres = False
            if (goingTotal > 15 and delivery == "1") or delivery == "0":
                goingTotal = round(goingTotal, 2)
                if goingTotal < minPrice and allPres  and len(items) == len(terms):
                    minPrice = goingTotal
                    bestBasket = {"items": items, "total": minPrice}
        #only tesco
        if((shops[0] == "0" or shops[0] == "1" ) and (shops[1] == "0" or shops[1] == "1" ) and shops[2] == "1" and (shops[3] == "0" or shops[3] == "1" ) and (shops[4] == "0" or shops[4] == "1" )):
            goingTotal = 0
            items = []
            for item in prods: 
                index = prods.index(item)
                if item[2]: 
                    price = item[2][0]["product_price"]
                    items.append({"term": terms[index], "found": True, "item": item[2][0]})
                    goingTotal += float(re.search("[0-9.]+", price).group())
                else:
                    items.append({"term": terms[index], "found": False, "item": {"url": "", "shop": "", "product_name": "Not Found", "product_price": "", "product_additionals": ""}})
                    allPres = False
            if delivery == "1":
                goingTotal += 5.50
            goingTotal = round(goingTotal, 2)
            if goingTotal < minPrice and allPres  and len(items) == len(terms):
                minPrice = goingTotal
                bestBasket = {"items": items, "total": minPrice}
        #only aldi
        if((shops[0] == "0" or shops[0] == "1" ) and (shops[1] == "0" or shops[1] == "1" ) and (shops[2] == "0" or shops[2] == "1" ) and shops[3] == "1" and (shops[4] == "0" or shops[4] == "1" )):
            goingTotal = 0
            items = []
            for item in prods: 
                index = prods.index(item)
                if item[3]: 
                    price = item[3][0]["product_price"]
                    items.append({"term": terms[index], "found": True, "item": item[3][0]})
                    goingTotal += float(re.search("[0-9.]+", price).group())
                else:
                    items.append({"term": terms[index], "found": False, "item": {"url": "", "shop": "", "product_name": "Not Found", "product_price": "", "product_additionals": ""}})
                    allPres = False
            if delivery == "1" and goingTotal <= 30:
                goingTotal += 2.95
            goingTotal = round(goingTotal, 2)
            if goingTotal < minPrice and allPres  and len(items) == len(terms):
                minPrice = goingTotal
                bestBasket = {"items": items, "total": minPrice}
        #only sains
        if((shops[0] == "0" or shops[0] == "1" ) and (shops[1] == "0" or shops[1] == "1" ) and (shops[2] == "0" or shops[2] == "1" ) and (shops[3] == "0" or shops[3] == "1" ) and shops[4] == "1"):
            goingTotal = 0
            items = []
            for item in prods: 
                index = prods.index(item)
                if item[4]: 
                    price = item[4][0]["product_price"]
                    items.append({"term": terms[index], "found": True, "item": item[4][0]})
                    goingTotal += float(re.search("[0-9.]+", price).group())
                else:
                    items.append({"term": terms[index], "found": False, "item": {"url": "", "shop": "", "product_name": "Not Found", "product_price": "", "product_additionals": ""}})
                    allPres = False
            if (goingTotal > 15 and delivery == "1") or delivery == "0":
                if delivery == "1" and goingTotal <= 40:
                    goingTotal += 7
                goingTotal = round(goingTotal, 2)
                if goingTotal < minPrice and allPres  and len(items) == len(terms):
                    minPrice = goingTotal
                    bestBasket = {"items": items, "total": minPrice}
        #only asda and coop
        if(shops[0] == "1" and shops[1] == "1" and (shops[2] == "0" or shops[2] == "1" ) and (shops[3] == "0" or shops[3] == "1" ) and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
            permutations = itertools.permutations(comb)
            for permutation in permutations:
                items = []
                asdaCount = 0
                coopCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "coop":
                            coopCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 15 and delivery == "1") or delivery == "0":
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 3.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda and tesco
        if(shops[0] == "1" and (shops[1] == "0" or shops[1] == "1" ) and shops[2] == "1" and (shops[3] == "0" or shops[3] == "1" ) and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[2]:
                    comb.append(item[2][0])
            permutations = itertools.permutations(comb)
            for permutation in permutations:
                items = []
                asdaCount = 0
                tescoCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if delivery == "1":
                    goingTotal += 5.50
                    if goingTotal < 40.00:
                        goingTotal += 3.00
                goingTotal = round(goingTotal, 2)
                if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                    minPrice = goingTotal
                    bestBasket = {"items": items, "total": minPrice}
        #only coop and tesco
        if((shops[0] == "0" or shops[0] == "1" ) and shops[1] == "1" and shops[2] == "1" and (shops[3] == "0" or shops[3] == "1" ) and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[1]: 
                    comb.append(item[1][0])
                if item[2]:
                    comb.append(item[2][0])
            permutations = itertools.permutations(comb)
            for permutation in permutations:
                items = []
                coopCount = 0
                tescoCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "coop":
                            coopCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 15 and delivery == "1") or delivery == "0":
                    if delivery == "1":
                        goingTotal += 5.50
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda and aldi
        if(shops[0] == "1" and (shops[1] == "0" or shops[1] == "1" ) and (shops[2] == "0" or shops[2] == "1" ) and shops[3] == "1" and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[3]:
                    comb.append(item[3][0])
            permutations = itertools.permutations(comb)
            for permutation in permutations:
                items = []
                asdaCount = 0
                aldiCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if goingTotal < 40.00 and delivery == "1":
                    goingTotal += 5.50
                if goingTotal < 30.00 and delivery == "1":
                    goingTotal += 2.95
                goingTotal = round(goingTotal, 2)
                if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                    minPrice = goingTotal
                    bestBasket = {"items": items, "total": minPrice}
        #only coop and aldi
        if((shops[0] == "0" or shops[0] == "1" ) and shops[1] == "1" and (shops[2] == "0" or shops[2] == "1" ) and shops[3] == "1" and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[1]: 
                    comb.append(item[1][0])
                if item[3]:
                    comb.append(item[3][0])
            permutations = itertools.permutations(comb)
            for permutation in permutations:
                items = []
                aldiCount = 0
                coopCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "aldi":
                            aldiCount += 1
                        if shop == "coop":
                            coopCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 15 and delivery == "1") or delivery == "0":
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only tesco and aldi
        if((shops[0] == "0" or shops[0] == "1" ) and (shops[1] == "0" or shops[1] == "1" ) and shops[2] == "1" and shops[3] == "1" and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[2]: 
                    comb.append(item[2][0])
                if item[3]:
                    comb.append(item[3][0])
            permutations = itertools.permutations(comb)
            for permutation in permutations:
                items = []
                aldiCount = 0
                tescoCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "aldi":
                            aldiCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if delivery == "1":
                    goingTotal += 5.50
                    if goingTotal < 30.00:
                        goingTotal += 2.95
                goingTotal = round(goingTotal, 2)
                if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                    minPrice = goingTotal
                    bestBasket = {"items": items, "total": minPrice}
        #only asda and sains
        if(shops[0] == "1" and (shops[1] == "0" or shops[1] == "1" ) and (shops[2] == "0" or shops[2] == "1" ) and (shops[3] == "0" or shops[3] == "1" ) and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
            permutations = itertools.permutations(comb)
            for permutation in permutations:
                items = []
                asdaCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 10.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only coop and sains
        if((shops[0] == "0" or shops[0] == "1" ) and shops[1] == "1" and (shops[2] == "0" or shops[2] == "1" ) and (shops[3] == "0" or shops[3] == "1" ) and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
            permutations = itertools.permutations(comb)
            for permutation in permutations:
                items = []
                sainsCount = 0
                coopCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "coop":
                            coopCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 7.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only tesco and sains
        if((shops[0] == "0" or shops[0] == "1" ) and (shops[1] == "0" or shops[1] == "1" ) and shops[2] == "1" and (shops[3] == "0" or shops[3] == "1" ) and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
            permutations = itertools.permutations(comb)
            for permutation in permutations:
                items = []
                sainsCount = 0
                tescoCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 7.00
                    if delivery == "1":
                        goingTotal += 5.50
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms): 
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only aldi and sains
        if((shops[0] == "0" or shops[0] == "1" ) and (shops[1] == "0" or shops[1] == "1" ) and (shops[2] == "0" or shops[2] == "1" ) and shops[3] == "1" and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
            permutations = itertools.permutations(comb)
            for permutation in permutations:
                items = []
                sainsCount = 0
                aldiCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "aldi":
                            aldiCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 7.00
                    if delivery == "1" and goingTotal < 30:
                        goingTotal += 2.95
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda, coop and tesco
        if(shops[0] == "1" and shops[1] == "1" and shops[2] == "1" and (shops[3] == "0" or shops[3] == "1" ) and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
                if item[2]:
                    comb.append(item[2][0])
            permutations = itertools.permutations(comb,3)
            for permutation in permutations:
                items = []
                asdaCount = 0
                coopCount = 0
                tescoCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "coop":
                            coopCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 15 and delivery == "1") or delivery == "0":
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 3.00
                    if delivery == "1":
                        goingTotal += 5.50
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda, coop and aldi
        if(shops[0] == "1" and shops[1] == "1" and (shops[2] == "0" or shops[2] == "1" ) and shops[3] == "1" and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
                if item[3]:
                    comb.append(item[3][0])
            permutations = itertools.permutations(comb,3)
            for permutation in permutations:
                items = []
                asdaCount = 0
                coopCount = 0
                aldiCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "coop":
                            coopCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 15 and delivery == "1") or delivery == "0":
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 3.00
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda, tesco and aldi
        if(shops[0] == "1" and (shops[1] == "0" or shops[1] == "1" ) and shops[2] == "1" and shops[3] == "1" and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[2]:
                    comb.append(item[2][0])
                if item[3]:
                    comb.append(item[3][0])
            permutations = itertools.permutations(comb,3)
            for permutation in permutations:
                items = []
                asdaCount = 0
                tescoCount = 0
                aldiCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if goingTotal < 40.00 and delivery == "1":
                    goingTotal += 3.00
                if goingTotal < 30.00 and delivery == "1":
                    goingTotal += 2.95
                if delivery == "1":
                    goingTotal += 5.50
                goingTotal = round(goingTotal, 2)
                if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                    minPrice = goingTotal
                    bestBasket = {"items": items, "total": minPrice}
        #only coop, tesco adn aldi
        if((shops[0] == "0" or shops[0] == "1") and shops[1] == "1" and shops[2] == "1" and shops[3] == "1" and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[1]: 
                    comb.append(item[1][0])
                if item[2]:
                    comb.append(item[2][0])
                if item[3]:
                    comb.append(item[3][0])
            permutations = itertools.permutations(comb,3)
            for permutation in permutations:
                items = []
                tescoCount = 0
                coopCount = 0
                aldiCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "coop":
                            coopCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 15 and delivery == "1") or delivery == "0":
                    if delivery == "1":
                        goingTotal += 5.50
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda, coop and sains
        if(shops[0] == "1" and shops[1] == "1" and (shops[2] == "0" or shops[2] == "1" ) and (shops[3] == "0" or shops[3] == "1" ) and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
                if item[4]:
                    comb.append(item[4][0])
            permutations = itertools.permutations(comb,3)
            for permutation in permutations:
                items = []
                asdaCount = 0
                coopCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "coop":
                            coopCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 10.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda, tesco and sains
        if(shops[0] == "1" and (shops[1] == "0" or shops[1] == "1" ) and shops[2] == "1" and (shops[3] == "0" or shops[3] == "1" ) and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[2]:
                    comb.append(item[2][0])
                if item[4]:
                    comb.append(item[4][0])
            permutations = itertools.permutations(comb,3)
            for permutation in permutations:
                items = []
                asdaCount = 0
                tescoCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if delivery == "1":
                        goingTotal += 5.50
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 10.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only coop, tesco and sains
        if((shops[0] == "0" or shops[0] == "1" ) and shops[1] == "1" and shops[2] == "1" and (shops[3] == "0" or shops[3] == "1" ) and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[1]: 
                    comb.append(item[1][0])
                if item[2]:
                    comb.append(item[2][0])
                if item[4]:
                    comb.append(item[4][0])
            permutations = itertools.permutations(comb,3)
            for permutation in permutations:
                items = []
                coopCount = 0
                tescoCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "coop":
                            coopCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if delivery == "1":
                        goingTotal += 5.50
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 7.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda, aldi and sains
        if(shops[0] == "1" and (shops[1] == "0" or shops[1] == "1" ) and (shops[2] == "0" or shops[2] == "1" ) and shops[3] == "1" and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[3]:
                    comb.append(item[3][0])
                if item[4]:
                    comb.append(item[4][0])
            permutations = itertools.permutations(comb,3)
            for permutation in permutations:
                items = []
                asdaCount = 0
                aldiCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 10.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only coop, aldi and sains
        if((shops[0] == "0" or shops[0] == "1" ) and shops[1] == "1" and (shops[2] == "0" or shops[2] == "1" ) and shops[3] == "1" and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[1]: 
                    comb.append(item[1][0])
                if item[3]:
                    comb.append(item[3][0])
                if item[4]:
                    comb.append(item[4][0])
            permutations = itertools.permutations(comb,3)
            for permutation in permutations:
                items = []
                coopCount = 0
                aldiCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "coop":
                            coopCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 7.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only tesco, aldi and sains
        if((shops[0] == "0" or shops[0] == "1" ) and (shops[1] == "0" or shops[1] == "1" ) and shops[2] == "1" and shops[3] == "1" and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[2]: 
                    comb.append(item[2][0])
                if item[3]:
                    comb.append(item[3][0])
                if item[4]:
                    comb.append(item[4][0])
            permutations = itertools.permutations(comb,3)
            for permutation in permutations:
                items = []
                tescoCount = 0
                aldiCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if delivery == "1":
                        goingTotal += 5.50
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 7.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda, coop, tesco and aldi
        if(shops[0] == "1" and shops[1] == "1" and shops[2] == "1" and shops[3] == "1" and (shops[4] == "0" or shops[4] == "1" )):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
                if item[2]:
                    comb.append(item[2][0])
                if item[3]:
                    comb.append(item[3][0])
            permutations = itertools.permutations(comb,4)
            for permutation in permutations:
                items = []
                asdaCount = 0
                coopCount = 0
                tescoCount = 0
                aldiCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "coop":
                            coopCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 15 and delivery == "1") or delivery == "0":
                    if delivery == "1":
                        goingTotal += 5.50
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 3.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda, coop, tesco and sains
        if(shops[0] == "1" and shops[1] == "1" and shops[2] == "1" and (shops[3] == "0" or shops[3] == "1" ) and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
                if item[2]:
                    comb.append(item[2][0])
                if item[4]:
                    comb.append(item[4][0])
            permutations = itertools.permutations(comb,4)
            for permutation in permutations:
                items = []
                asdaCount = 0
                coopCount = 0
                tescoCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "coop":
                            coopCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if delivery == "1":
                        goingTotal += 5.50
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 10.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda, coop, aldi and sains
        if(shops[0] == "1" and shops[1] == "1" and (shops[2] == "0" or shops[2] == "1" ) and shops[3] == "1" and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
                if item[3]:
                    comb.append(item[3][0])
                if item[4]:
                    comb.append(item[4][0])
            permutations = itertools.permutations(comb,4)
            for permutation in permutations:
                items = []
                asdaCount = 0
                coopCount = 0
                aldiCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "coop":
                            coopCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 10.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only asda, tesco, aldi and sains
        if(shops[0] == "1" and (shops[1] == "0" or shops[1] == "1" ) and shops[2] == "1" and shops[3] == "1" and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[2]:
                    comb.append(item[2][0])
                if item[3]:
                    comb.append(item[3][0])
                if item[4]:
                    comb.append(item[4][0])
            permutations = itertools.permutations(comb,4)
            for permutation in permutations:
                items = []
                asdaCount = 0
                tescoCount = 0
                aldiCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if delivery == "1":
                        goingTotal += 5.50
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 10.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #only coop, tesco, aldi and sains
        if((shops[0] == "0" or shops[0] == "1")  and shops[1] == "1" and shops[2] == "1" and shops[3] == "1" and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[1]: 
                    comb.append(item[1][0])
                if item[2]:
                    comb.append(item[2][0])
                if item[3]:
                    comb.append(item[3][0])
                if item[4]:
                    comb.append(item[4][0])
            permutations = itertools.permutations(comb,4)
            for permutation in permutations:
                items = []
                coopCount = 0
                tescoCount = 0
                aldiCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "coop":
                            coopCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if delivery == "1":
                        goingTotal += 5.50
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 7.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
        #All stores
        if(shops[0] == "1" and shops[1] == "1" and shops[2] == "1" and shops[3] == "1" and shops[4] == "1"):
            comb = []
            items = []
            for item in prods:
                index = prods.index(item)
                if item[0]: 
                    comb.append(item[0][0])
                if item[1]:
                    comb.append(item[1][0])
                if item[2]:
                    comb.append(item[2][0])
                if item[3]:
                    comb.append(item[2][0])
                if item[4]:
                    comb.append(item[2][0])
            permutations = itertools.permutations(comb,5)
            for permutation in permutations:
                items = []
                asdaCount = 0 
                coopCount = 0
                tescoCount = 0
                aldiCount = 0
                sainsCount = 0
                goingTotal = 0
                for item in permutation:
                    if item: 
                        price = item["product_price"]
                        shop = item["shop"]
                        if shop == "asda":
                            asdaCount += 1
                        if shop == "coop":
                            coopCount += 1
                        if shop == "tesco":
                            tescoCount += 1
                        if shop == "aldi":
                            aldiCount += 1
                        if shop == "sains":
                            sainsCount += 1
                        items.append({"term": terms[index], "found": True, "item": item})
                        goingTotal += float(re.search("[0-9.]+", price).group())
                if (goingTotal > 25 and delivery == "1") or delivery == "0":
                    if delivery == "1":
                        goingTotal += 5.50
                    if goingTotal < 30.00 and delivery == "1":
                        goingTotal += 2.95
                    if goingTotal < 40.00 and delivery == "1":
                        goingTotal += 10.00
                    goingTotal = round(goingTotal, 2)
                    if goingTotal < minPrice and len(items) != 0  and len(items) == len(terms):
                        minPrice = goingTotal
                        bestBasket = {"items": items, "total": minPrice}
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    return bestBasket

try:
    output = []
    items = []
    lines = sys.stdin.readlines()
    #print(str(sys.argv))
    mycursor = mydb.cursor()
    shops = sys.argv[1::]
    #print(str(shops))
    total = 0
    for x in lines:
        prodterm = x[0:-1]
        #Call Browse (asda, coop, tesco, aldi, sainsburys, PRODUCT TERM)
        results = mycursor.callproc("browseProductsNameAsc", args=(int(sys.argv[1]),int(sys.argv[2]),int(sys.argv[3]),int(sys.argv[4]),int(sys.argv[5]),'%'+prodterm+'%'))
        for result in mycursor.stored_results():
            row_headers=[x[0] for x in result.description]
            rv = result.fetchall()
            json_data=[]
            for result in rv:
                json_data.append(dict(zip(row_headers,result)))
            x = script.searchFromBrowse(json_data, prodterm)
            bestFromShops = searchBestFromShops(x, shops)
            items.append((bestFromShops, prodterm))
    bestBasket = findBestBasket(items, sys.argv[6], shops)
    print(json.dumps(bestBasket))
except Exception as e:
    exc_type, exc_obj, exc_tb = sys.exc_info()
    fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]