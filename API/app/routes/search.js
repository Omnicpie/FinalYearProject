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
		let query = 'CALL browseProductsNameAsc(1,1,1,1,1,"%'+req.body.term+'%")';
		let log = []
		db.sequelize.query(query).then(out => {
			const python = spawn('python3',["/home/pi/Documents/API/FinalYearProject/API/script.py", req.body.term]);
			python.stdin.write(JSON.stringify(out));
			python.stdin.end();

			python.stdout.on('data', function (data) {
				console.log('Pipe data from python script ...');
				dataToSend = data.toString();
				log.push(dataToSend)
			});

			python.on('error', (err) => {console.log(err)});
			
			python.on('close', (code, signal) => {
				console.log(`child process close all stdio with code ${code} and signal ${signal}`);
				res.send(log[0]);
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