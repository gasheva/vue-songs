const jwt = require('jsonwebtoken');
require('dotenv').config();

function verify(token, cb) {
  jwt.verify(token, process.env.JWT_SECRET, cb);
};

module.exports = (req, res, next) => {
  console.log('authenticateJWT');
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];     // Bearer [JWT_TOKEN]
    console.log(token);
    verify(token, (err, user) => {
      if (err) {
        console.log(err.name);
        switch (err.name) {
          case 'TokenExpiredError':
            return res.status(401).json({ msg: "Token expired" });
          case 'UnauthorizedError':
            return res.status(401).json({ msg: "Unauthorized" });
          case 'JsonWebTokenError':
            return res.status(401).json({ msg: "Token error" });
          default:
            return res.sendStatus(401);
        }
      }
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    console.log('no authorized header');
    res.status(401).json({msg: "No authorized header"});
  }
}