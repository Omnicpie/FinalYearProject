import sys, json, re, os, textdistance


# Checks a set of products to get the additionals into a correct format
def checkAdditionals(products):
    for item in products:
        if item["product_additionals"] == "No weight data":
            try:
                weightsOrVolumes = re.search("[0-9]+[a-zA-z]+", item["product_name"])
                if weightsOrVolumes:
                    weightsOrVolumesResult = weightsOrVolumes.group()
                    num = re.search("[0-9]+", weightsOrVolumesResult).group()
                    price = item["product_price"]
                    try: 
                        xy = float(price) / float(weightsOrVolumesResult)
                    except:
                        continue
                    priceNoSigns  = re.search("[0-9.]+",price).group()
                    xy = float(priceNoSigns) / float(num)
                    if(re.search("[a-zA-z]+", weightsOrVolumesResult).group() == ""):
                        d = "each"
                    else: 
                        d = re.search("[a-zA-z]+", weightsOrVolumesResult).group()
                    output = str(xy) + "/" + d
                    item["product_additionals"] = output
                else:
                    amounts = re.search("[0-9]+", item["product_name"])

            except:
                continue
    return products

# Finds a value for how close a product is to a search term
def getTextSimilarity(term, prod_name):
    similarity = textdistance.ratcliff_obershelp.normalized_similarity(term, prod_name)
    return similarity

# groups products based on what units they use to count products
def groupTypes(products, term):
    eachSet = []
    kgSet = []
    lSet = []
    try:
        for item in products:
            try:
                # Finds a price/(item or unit weight)
                try:
                    info = str(re.search("/[0-9A-Za-z ]+", item["product_additionals"]).group())
                except:
                    info = str(re.search("per [0-9A-Za-z ]+", item["product_additionals"]).group())
                try:
                    priceNoSigns  = float(re.search("[0-9.]+",item["product_additionals"]).group())
                except:
                    priceNoSigns  = float(re.search("[0-9.]+",item["product_price"]).group())

                infosigns = str(re.search("[A-Za-z ]+", info).group())
                quantity = re.search("[0-9]+", info)
                #checks if a quantity is present
                if quantity: 
                    quantity = float(quantity.group())
                else:
                    quantity = 1
                # finds the similarity rating for a product
                textLikeness = getTextSimilarity(item["product_name"], term)
                sub = infosigns.lower()
                # decided which set to go in, gives a overall value and appends to set
                if sub == "each":
                    value = priceNoSigns / textLikeness
                    combine = item, value, textLikeness
                    eachSet.append(combine)
                elif sub == "kg" or sub == "g":
                    #if the unit is a sub of the mainone, change price to be same unit
                    if sub == "g":
                        priceNoSigns = priceNoSigns * 1000 / quantity
                    value = priceNoSigns / textLikeness
                    combine = item, value, textLikeness
                    kgSet.append(combine)
                elif sub == "l" or sub == "ml" or sub == "cl":
                    #if the unit is a sub of the mainone, change price to be same unit
                    if sub == "ml":
                        priceNoSigns = priceNoSigns * 1000 / quantity
                    elif sub == "cl":
                        priceNoSigns = priceNoSigns * 100 / quantity
                    value = priceNoSigns / textLikeness
                    combine = item, value, textLikeness
                    lSet.append(combine)
            except Exception as e:
                exc_type, exc_obj, exc_tb = sys.exc_info()
                fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1] 
                continue
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1] 
    # returns the 3 sets
    return eachSet, kgSet, lSet

#sorts based on the second element in the array/tuple
def sortElem(elem):
    return elem[1]

def main():
    #reads the stdin from node containing products
    lines = sys.stdin.readlines()
    products = json.loads(lines[0])
    f=open("products.txt", "w")
    f.write(str(products))
    f.close()
    #reads terms passed as the second argument
    term = sys.argv[1]
    # checks the products to have all with weightings and additionals
    productsChecked = checkAdditionals(products)
    f=open("additionalsChecked.txt", "w")
    f.write(str(productsChecked))
    f.close()
    #groups the products into 3 arrays, perEach, perKg, PerLitre
    groupedSets = groupTypes(productsChecked, term)
    f=open("groupedbytype.txt", "w")
    f.write(str(groupedSets))
    f.close()
    #sorts the sets so the smallest cost first
    groupedSets[0].sort(key=sortElem)
    groupedSets[1].sort(key=sortElem)
    groupedSets[2].sort(key=sortElem)
    lens = []
    #puts the lengths of each of the sets into an array
    lens.append((0, len(groupedSets[0])))
    lens.append((1, len(groupedSets[1])))
    lens.append((2, len(groupedSets[2])))
    f=open("lengths.txt", "w")
    f.write(str(lens))
    f.close()
    #then sorted by lengths so biggest list is first
    lens.sort(key=sortElem)
    finalOrder = []
    # going in order from biggest to smallest products are selected
    for x  in lens:
        array = x[0]
        for i in groupedSets[array]:
            finalOrder.append(i[0])
    
    if len(finalOrder) < 30: 
        end = len(finalOrder)-1
    else:
        end = 30
    print(json.dumps(finalOrder[0:end]))
    f=open("finalOutput.txt", "w")
    f.write(str(json.dumps(finalOrder[0:end])))
    f.close()
    #prints products limited to 30 to stop sending of too much data.
    return json.dumps(finalOrder[0:end])

# A function version of above for when not run by node
def searchFromBrowse(products, term):
    productsChecked = checkAdditionals(products)
    groupedSets = groupTypes(productsChecked, term)
    groupedSets[0].sort(key=sortElem)
    groupedSets[1].sort(key=sortElem)
    groupedSets[2].sort(key=sortElem)
    lens = []
    lens.append((0, len(groupedSets[0])))
    lens.append((1, len(groupedSets[1])))
    lens.append((2, len(groupedSets[2])))
    lens.sort(key=sortElem)
    finalOrder = []
    for x  in lens:
        array = x[0]
        for i in groupedSets[array]:
            finalOrder.append(i[0])
    if len(finalOrder) < 30: 
        end = len(finalOrder)-1
    else:
        end = 30
    return finalOrder

#if file ran by node, this is true.
if(sys.argv[0] == "/home/pi/Documents/API/FinalYearProject/API/search.py"):
    main()