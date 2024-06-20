const jwt = require("jsonwebtoken");

// Middleware to check if the user is signed in
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

// Middleware to check if the user has the role 'user'
exports.userMiddleware = (req, res, next) => {
    console.log(req.user)
    if (req.user.role !== 'user') {
        return res.status(400).json({ message: "You are not a user, access denied!" });
    }
    next();
};

// Middleware to check if the user has the role 'admin'
exports.adminMiddleware = (req, res, next) => {
    console.log(req.user);
    if (req.user.role !== "admin") {
        return res.status(400).json({ message: "You are not the admin, access denied" });
    }
    next();
};
