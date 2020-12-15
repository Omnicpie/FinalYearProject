const db = require("../models");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.get("/api/browse/:term", (req, res) => {
        console.log(req.params.term)
        let q = 'CALL browseProducts(1,1,1,1,1, "%' + req.params.term + '%")';
        db.sequelize.query(q).then(out => res.send(out));
    });
    
    app.get("/api/browse", (req, res) => {
        db.sequelize.query('CALL browseProducts(1,1,1,1,1, "%%")').then(out => res.send(out));
    });

    
};