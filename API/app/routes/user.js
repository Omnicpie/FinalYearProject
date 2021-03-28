const { authJwt } = require("../middleware");
const controller = require("../controllers/user");
const db = require("../models");

module.exports = function(app) {
	app.use(function(req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

	app.get("/api/test/all", controller.allAccess);

	app.get(
		"/api/test/user",
		[authJwt.verifyToken],
		controller.userBoard
	);


	app.post("/api/user", (req, res) => {
		let query = "SELECT display_name,email,createdAt FROM users WHERE display_name='"+req.body.display_name+"'";
		db.sequelize.query(query).then(out => res.send(out[0]));
	});
};