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
        console.log(req.body);
        let query = 'CALL browseProducts('+req.body.shops.asda+','+req.body.shops.coop+','+req.body.shops.tesco+','+req.body.shops.aldi+','+req.body.shops.sains+', "%'+req.body.term+'%")';
        db.sequelize.query(query).then(out => res.send(out));
    });

    
};