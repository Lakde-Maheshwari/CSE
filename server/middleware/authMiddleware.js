const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization'); // Get token from request headers

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token." });
        }

        req.user = user; // Attach user data to request
        next(); // Continue to the next middleware
    });
};

module.exports = { authenticateJWT }; // Export as an object
