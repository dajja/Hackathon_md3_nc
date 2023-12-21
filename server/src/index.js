const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const { usersRouter } = require('./router/user.routes');
const { todosRouter } = require('./router/todo.routes');
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

usersRouter(app);
todosRouter(app);
app.listen(process.env.PORT, () => {
    console.log(`port o cong ${process.env.PORT}`);
})