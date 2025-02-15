const jwt = require('jsonwebtoken');
require('dotenv').config();


const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized, JWT Token is Required" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "Unauthorized, JWT Token is Required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Unauthorized, JWT Token is Invalid or Expired" });
    }
};

module.exports = ensureAuthenticated;
