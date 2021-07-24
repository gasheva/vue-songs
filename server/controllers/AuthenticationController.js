const { User } = require('../models/user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK
  });
}
module.exports = {
  register(req, res) {
    console.log('[x] Register');
    const user = new User({ email: req.body.email, password: req.body.password });
    user.save((err) => {
      if (err) {
        switch (err.code) {
          case "SQLITE_CONSTRAINT":
              return res.status(403).json({ msg: "Login exists" });
          default:
              return res.status(403).json({ msg: err });
        }
      }
      return res.json({token:jwtSignUser({id: user.id})});
    })
  },
  login(req, res) {
    console.log('login');
    User.authenticate({ email: req.body.email, password: req.body.password }, (err, id) => {
      if (err) return res.status(403).json({ msg: err });
      return res.json({token: jwtSignUser({id: id})});
    })
  }
}