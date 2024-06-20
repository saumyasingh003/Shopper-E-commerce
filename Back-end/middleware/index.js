const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization required" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    req.user = user;
    next();
  });
};
