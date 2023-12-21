const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Không tìm thấy token" });
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ type: 1, message: "Token đã hết hạn" });
                } else {
                    return res.status(403).json({ type: 1, message: "Token không hợp lệ" });
                }
            }
            if (decoded.role != 0) {
                return res.status(403).json({ type: 2, message: "Bạn không có quyền thao tác" });
            }
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    verifyToken
}