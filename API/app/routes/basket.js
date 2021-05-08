const db = require("../models");
const {spawn} = require('child_process');

async function xyz(productId, shop){
    let shopText = shop;
    if (shop === "sainsburys"){
        shopText = "sains"
    }
    let query = "select '"+shopText+"' AS shop, url, product_name,product_price,product_additionals from "+shopText+" where url='"+productId+"'";
    let item = {url: "", shop: "", product_name: "", product_price: "", product_additionals: ""}
    await db.sequelize.query(query).then(async out => {
        let u = out[0][0]
        item = {url: u.url, shop: u.shop, product_name: u.product_name, product_price: u.product_price, product_additionals: u.product_additionals}
    })
    return item
}

async function getProd(prodterm){
    let query = 'CALL browseProductsNameAsc(1,1,1,1,1,"%'+prodterm+'%")';
    let log = []
    let u = {}
    await db.sequelize.query(query).then(out => {
        u = out[0]
    }).catch(function (err) { res.send([])});
    return u
}

module.exports =  function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

    app.post("/api/basket/save", (req, res)=>{
        console.log("-----------------")
        console.log("BASKET SAVE")
        console.log(req.body)
        console.log("-----------------")
        if(req.body.type === "new"){
            let basketQuery = "INSERT saved_basket(user_id, price, name) VALUES ('"+req.body.user.display_name+"','"+req.body.price+"','"+req.body.name+"')"
            db.sequelize.query(basketQuery).then(basket=>{
                let ID = basket[0].insertId
                for(let i = 0; i<req.body.products.length; i++){
                    let prodQuery = ""
                    switch (req.body.products[i].shop) {
                        case "asda":
                            prodQuery = "INSERT basket_content(basket_id, term, item_id_asda) VALUES ("+ID+",'"+req.body.products[i].term+"','"+req.body.products[i].item+"')"
                            break;
                        case "coop":
                            prodQuery = "INSERT basket_content(basket_id, term, item_id_coop) VALUES ("+ID+",'"+req.body.products[i].term+"','"+req.body.products[i].item+"')"
                            break;
                        case "aldi":
                            prodQuery = "INSERT basket_content(basket_id, term, item_id_aldi) VALUES ("+ID+",'"+req.body.products[i].term+"','"+req.body.products[i].item+"')"
                            break;
                        case "tesco":
                            prodQuery = "INSERT basket_content(basket_id, term, item_id_tesco) VALUES ("+ID+",'"+req.body.products[i].term+"','"+req.body.products[i].item+"')"
                            break;
                        case "sainsburys":
                            prodQuery = "INSERT basket_content(basket_id, term, item_id_sainsburys) VALUES ("+ID+",'"+req.body.products[i].term+"','"+req.body.products[i].item+"')"
                            break;
                        default:
                            prodQuery = "INSERT basket_content(basket_id, term) VALUES ("+ID+",'"+req.body.products[i].term+"')"
                            break;
                    }
                    db.sequelize.query(prodQuery)
                }
            }).catch(function (err) { res.send([])});
        }
        else if(req.body.type === "overwrite"){
            let basketQuery = "UPDATE saved_basket SET price='"+req.body.price+"' WHERE id="+req.body.overwrite
            db.sequelize.query(basketQuery)
            let itemsDelete = "DELETE FROM basket_content WHERE basket_id="+req.body.overwrite;
            db.sequelize.query(itemsDelete)
            let ID = req.body.overwrite;
            for(let i = 0; i<req.body.products.length; i++){
                let prodQuery = ""
                switch (req.body.products[i].shop) {
                    case "asda":
                        prodQuery = "INSERT basket_content(basket_id, term, item_id_asda) VALUES ("+ID+",'"+req.body.products[i].term+"','"+req.body.products[i].item+"')"
                        break;
                    case "coop":
                        prodQuery = "INSERT basket_content(basket_id, term, item_id_coop) VALUES ("+ID+",'"+req.body.products[i].term+"','"+req.body.products[i].item+"')"
                        break;
                    case "aldi":
                        prodQuery = "INSERT basket_content(basket_id, term, item_id_aldi) VALUES ("+ID+",'"+req.body.products[i].term+"','"+req.body.products[i].item+"')"
                        break;
                    case "tesco":
                        prodQuery = "INSERT basket_content(basket_id, term, item_id_tesco) VALUES ("+ID+",'"+req.body.products[i].term+"','"+req.body.products[i].item+"')"
                        break;
                    case "sainsburys":
                        prodQuery = "INSERT basket_content(basket_id, term, item_id_sainsburys) VALUES ("+ID+",'"+req.body.products[i].term+"','"+req.body.products[i].item+"')"
                        break;
                    default:
                        prodQuery = "INSERT basket_content(basket_id, term) VALUES ("+ID+",'"+req.body.products[i].term+"')"
                        break;
                }
                db.sequelize.query(prodQuery)
            }
        }
        res.sendStatus(200)
    });

    app.post("/api/basket/get/all", (req, res)=>{
        let query = "SELECT * from saved_basket where user_id='"+req.body.display_name+"'";
        db.sequelize.query(query).then(out => {
            out = out[0]
            let x = []
            if(out.length == 0){
                res.send(x)
            }
            else{
                for(let i =0; i<out.length; i++){
                    let id = out[i].id
                    let name = out[i].name
                    let price = out[i].price
                    let query2 = "select count(*) as num_prods from basket_content where basket_id="+out[i].id
                    db.sequelize.query(query2).then(out2 => {
                        let item = {value: id, label: name, price: price, num_prods: out2[0][0].num_prods}
                        x.push(item)
                        if(i === out.length-1){
                            res.send(x)
                        }
                        else{
                        }
                    })
                }
            }
        });
    });

    app.post("/api/basket/get", (req, res)=>{
        let query = "select * from basket_content where basket_id="+req.body.id;
        db.sequelize.query(query).then(async out => {
            let results = out[0];
            let toSend = [];
            for(let i = 0; i < results.length; i++){
                let product = results[i]
                let item = {}
                let x = {}
                if(product.item_id_asda !== null){
                    x = await xyz(product.item_id_asda, "asda")
                    item = {term: product.term,found: true, item: x}
                }
                else if(product.item_id_tesco !== null){
                    x = await xyz(product.item_id_tesco, "tesco")
                    item = {term: product.term,found: true, item: x}
                }
                else if(product.item_id_aldi !== null){
                    x = await xyz(product.item_id_aldi, "aldi")
                    item = {term: product.term,found: true, item: x}
                }
                else if(product.item_id_sainsburys !== null){
                    x = await xyz(product.item_id_sainsburys, "sainsburys")
                    item = {term: product.term,found: true, item: x}
                }
                else if(product.item_id_coop !== null){
                    x = await xyz(product.item_id_coop, "coop")
                    item = {term: product.term,found: true, item: x}
                }
                else{
                    item = {term: product.term,found: false, item: {url: "", shop: "", product_name: "", product_price: "", product_additionals: ""}}
                    
                }
                toSend.push(item)
            }
            res.send(toSend);
        });
    });

    //the old find system, back up for is algo ever fails
    app.post("/api/basket/findv1", async (req, res)=>{
        let productTerms = req.body.products;
        console.log(req.body)
        let output = {items: [], total: 0}
        for(let i = 0; i < productTerms.length; i++){
            let product = {url: "", shop: "", product_name: "", product_price: "", product_additionals: ""}
            product = await getProd(productTerms[i])
            let item = {term: productTerms[i], found: true, item: product}
            console.log("produce ", product)
            if(product){
                if(product.product_price){
                    let price = product.product_price.match(/[0-9.]+/g);
                    console.log(price)
                    output.total += parseFloat(price);
                    console.log(output.total)
                }
            }
            else{
                item = {term: productTerms[i], found: false, item: {url: "", shop: "", product_name: "Not Found", product_price: "", product_additionals: ""}}
            }
            output.items.push(item)
        }
        output.total = Number((output.total).toFixed(2));
        console.log(output)
        res.send(output)
    });


    app.post("/api/basket/find", (req, res)=>{
		console.log("-----------------")
		console.log("BASKET FIND")
        console.log(req.body)
        let productTerms = req.body.products;
		let log = []
        const python = spawn('python3',["/home/pi/Documents/API/FinalYearProject/API/basket.py", req.body.shops.asda, req.body.shops.coop, req.body.shops.tesco, req.body.shops.aldi, req.body.shops.sains, req.body.delivery]);
        for(let i= 0; i< productTerms.length;i++){
            
            python.stdin.write(productTerms[i]);
            python.stdin.write("\n");
        }
        python.stdin.end();

        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script...');
            dataToSend = data.toString();
            log.push(dataToSend)
        });

        python.on('error', (err) => {console.log(err)});
        
        python.on('close', (code, signal) => {
            console.log(`child process close all stdio with code ${code} and signal ${signal}`);
            console.log("sending response")
            res.send(log[0]);
            console.log("-----------------")
        });
        
        python.on('uncaughtException', (err, origin) => {
            console.log(
                process.stderr.fd,
                `Caught exception: ${err}\n` +
                `Exception origin: ${origin}`
            );
            });

    });

    app.post("/api/basket/delete", (req, res)=>{
        let query = "delete from saved_basket where id="+req.body.basket;
        db.sequelize.query(query).then(out=>res.send(out))
    });
};
