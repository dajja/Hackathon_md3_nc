const { login } = require('../controllers/user.controller')
const usersRouter = (app) => {
    app.post('/login', login)
}

module.exports = {
    usersRouter
}