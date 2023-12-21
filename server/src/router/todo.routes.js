const { render, addNewTodo, deleteTodo, editTodo } = require('../controllers/todo.controller');
const { verifyToken } = require('../middleware/verify');
const todosRouter = (app) => {
    app.get("/todo", render);
    app.post("/todo", verifyToken, addNewTodo);
    app.put("/todo/:id", verifyToken, editTodo);
    app.delete("/todo/:id", verifyToken, deleteTodo);
}

module.exports = {
    todosRouter
}