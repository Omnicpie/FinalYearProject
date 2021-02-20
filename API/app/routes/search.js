const db = require("../models");
const {spawn} = require('child_process');

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
		db.sequelize.query(query).then(out => {
			const python = spawn('python3',["/home/pi/Documents/API/FinalYearProject/API/script.py", JSON.stringify(out.slice(0,25))]);

			python.stdout.on('data', function (data) {
				console.log('Pipe data from python script ...');
				dataToSend = data.toString();
				console.log(dataToSend);
				res.send(dataToSend);
			});
			python.on('error', (err) => {console.log(err)});
			python.on('close', (code, signal) => {
				console.log(`child process close all stdio with code ${code}`);
			});
			python.on('uncaughtException', (err, origin) => {
				console.log(
				  process.stderr.fd,
				  `Caught exception: ${err}\n` +
				  `Exception origin: ${origin}`
				);
			  });
		});

		
	});


};