const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { urlencoded } = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ msg: "Use a route to get started" });
});

require('./app/routes/auth')(app);
require('./app/routes/user')(app);
require('./app/routes/browse')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});