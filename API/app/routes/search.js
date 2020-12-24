const db = require("../models");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    
    app.post("/api/search", (req, res) => {
      let query = 'CALL browseProducts(1,1,1,1,1,"%'+req.body.term+'%")';
      db.sequelize.query(query).then(out => res.send(out.slice(0,25)));
    });

    
};