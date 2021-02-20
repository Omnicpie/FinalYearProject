const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { urlencoded } = require("body-parser");
const schedule = require("node-schedule");
const {spawn} = require('child_process');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

var j = schedule.scheduleJob('* 4 * * 7', function(){
    const python = spawn('python3', ['autoUpdate.py']);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
        console.log(dataToSend);
    });
    python.on('error', (err) => {console.log(err)});
    python.on('close', (code, signal) => {
        console.log(signal)
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

app.get("/", (req, res) => {
    res.json({ msg: "Use a route to get started" });
});

require('./app/routes/auth')(app);
require('./app/routes/user')(app);
require('./app/routes/browse')(app);
require('./app/routes/search')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});