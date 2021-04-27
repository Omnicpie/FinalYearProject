const db = require("../models");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/shops", (req, res) => {
		console.log("-----------------")
		console.log("LAST_MODIFIED")
		let query = 'select * from last_modified';
		let log = []
		db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT}).then(out => {
            console.log(out)
            res.send(JSON.stringify(out))
			console.log("-----------------")
		});

		
	});


};