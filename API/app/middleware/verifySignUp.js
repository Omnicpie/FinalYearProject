const db = require("../models");
const User = db.user;

checkDupeDisplayOrEmail = (req, res, next) => {
    // Username
  User.findOne({
    where: {
      display_name: req.body.display_name
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Display is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
    checkDupeDisplayOrEmail: checkDupeDisplayOrEmail
};

module.exports = verifySignUp;