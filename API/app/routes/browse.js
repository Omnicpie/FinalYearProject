const db = require("../models");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
    app.post("/api/browse", (req, res) => {
        let query = "";
        console.log("-----------------")
        console.log("BROWSE")
        console.log(req.body)
        console.log("-----------------")
        switch (req.body.orderby) {
          case "1":
            query = 'CALL browseProductsNameAsc('+req.body.shops.asda+','+req.body.shops.coop+','+req.body.shops.tesco+','+req.body.shops.aldi+','+req.body.shops.sains+', "%'+req.body.term+'%")';
            break;
          case "2": 
            query = 'CALL browseProductsNameDesc('+req.body.shops.asda+','+req.body.shops.coop+','+req.body.shops.tesco+','+req.body.shops.aldi+','+req.body.shops.sains+', "%'+req.body.term+'%")';
            break
          case "3": 
            query = 'CALL browseProductsPriceAsc('+req.body.shops.asda+','+req.body.shops.coop+','+req.body.shops.tesco+','+req.body.shops.aldi+','+req.body.shops.sains+', "%'+req.body.term+'%")';
            break
          case "4": 
            query = 'CALL browseProductsPriceDesc('+req.body.shops.asda+','+req.body.shops.coop+','+req.body.shops.tesco+','+req.body.shops.aldi+','+req.body.shops.sains+', "%'+req.body.term+'%")';
            break
          default:
            query = 'CALL browseProductsNameAsc('+req.body.shops.asda+','+req.body.shops.coop+','+req.body.shops.tesco+','+req.body.shops.aldi+','+req.body.shops.sains+', "%'+req.body.term+'%")';
            break;
        }

        db.sequelize.query(query).then(out => res.send(out)).catch(function (err) { res.send([])});
      
    });

    
};