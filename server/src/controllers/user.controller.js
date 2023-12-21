const { getUserByEmail } = require('../repository/user.repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();
async function login(req, res) {
    const { email, password } = req.body;
    if (email == "" || password == "") {
        return res.status(400).json({
            message: 'khong duoc de trong'
        })
    }
    if (!/^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+([A-Za-z0-9]{2,4}|museum)$/.test(email)) {
        return res.status(400).json({
            message: 'sai dinh dang email'
        })
    }
    let result = await getUserByEmail(email)
    if (!result) {
        return res.status(400).json({
            message: 'thong tin bi sai'
        })
    }
    if (password != result.password) {
        return res.status(400).json({
            message: 'thong tin bi sai'
        })
    }
    const token = jwt.sign({ id: result.id, role: result.role }, process.env.SECRET_KEY, {
        expiresIn: '15m'
    });
    return res.status(201).json({
        token,
        message: 'dang nhap thanh cong'
    })
}

module.exports = {
    login
}