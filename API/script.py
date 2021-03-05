import sys, json, re, os, textdistance

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
                        ddddddd = "sasdasdada"
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

            except Exception as e:
                asodcamsd = e
    return products

def getTextSimilarity(term, prod_name):
    similarity = textdistance.levenshtein.normalized_similarity(term, prod_name)
    return similarity


def groupTypes(products, term):
    eachSet = []
    kgSet = []
    lSet = []
    try:
        for item in products:
            try:
                info = str(re.search("/[0-9A-Za-z ]+", item["product_additionals"]).group())
                priceNoSigns  = float(re.search("[0-9.]+",item["product_additionals"]).group())

                infosigns = str(re.search("[A-Za-z ]+", info).group())
                quantity = re.search("[0-9]+", info)
                if quantity: 
                    quantity = float(quantity.group())
                else:
                    quantity = 1
                textLikeness = getTextSimilarity(item["product_name"], term)
                sub = infosigns.lower()
                if sub == "each":
                    value = priceNoSigns / textLikeness
                    combine = item, value, textLikeness
                    eachSet.append(combine)
                elif sub == "kg" or sub == "g":
                    if sub == "g":
                        priceNoSigns = priceNoSigns * 1000 / quantity
                    value = priceNoSigns / textLikeness
                    combine = item, value, textLikeness
                    kgSet.append(combine)
                elif sub == "l" or sub == "ml" or sub == "cl":
                    if sub == "ml":
                        priceNoSigns = priceNoSigns * 1000 / quantity
                    elif sub == "cl":
                        priceNoSigns = priceNoSigns * 100 / quantity
                    value = priceNoSigns / textLikeness
                    combine = item, value, textLikeness
                    lSet.append(combine)
            except:
                nothing = "skipping"
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    return eachSet, kgSet, lSet
        
def sortElem(elem):
    return elem[1]

def main():
    lines = sys.stdin.readlines()
    products = json.loads(lines[0])
    f = open("text2.txt", "w")
    f.write(str(products))
    f.close()
    term = sys.argv[1]
    productsChecked = checkAdditionals(products)
    f = open("text3.txt", "w")
    f.write(str(products))
    f.close()
    groupedSets = groupTypes(productsChecked, term)
    f = open("text4.txt", "w")
    f.write(str(groupedSets))
    f.close()
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

    f = open("text.txt", "w")
    f.write(str(groupedSets).replace("]", "\n\n"))
    f.close()
    print(json.dumps(finalOrder[0:end]))




main()