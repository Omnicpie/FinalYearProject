const jwt = require("jsonwebtoken");
const config = require("../configs/auth");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token){
        return res.status(403).send({ msg: "no token" });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return res.status(401).send({ msg: "Unauth" });
        }
        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;