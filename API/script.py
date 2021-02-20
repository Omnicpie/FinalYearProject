import sys, json, re
products = json.loads(sys.argv[1])

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
                    print(item["product_name"])
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
            print(e)



print(json.dumps(products))