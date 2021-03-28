const db = require("../models");
const config = require("../configs/auth");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    User.create({
        display_name: req.body.display_name,
        email: req.body.email,
        p_hash: bcrypt.hashSync(req.body.password, 10)
    })
    .then(user => {
        res.send({ msg: "User registered! You can now log in" })
    })
    .catch(err => {
        res.status(500).send({ msg: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({
      where: {
        display_name: req.body.display_name
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(req.body.password,user.p_hash);
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        res.status(200).send({
            id: user.id,
            display_name: user.display_name,
            email: user.email,
            accessToken: token
        });
    
      })
      .catch(err => {
            console.log(err)
            res.status(500).send({ message: err.message });
      });
  };