const { getAllTodo, addTodo, deletingTodo, editingTodo } = require('../repository/todo.repository');

async function render(req, res) {
    let data = await getAllTodo();
    res.status(200).json(data);
}

async function addNewTodo(req, res) {
    if (req.body.name.trim().length <= 0) {
        return res.status(400).json({
            message: 'khong duoc de trong'
        })
    }
    await addTodo(req.body.name);
    res.status(201).json({
        message: 'them thanh cong'
    })
}

async function editTodo(req, res) {
    const { name } = req.body;
    const { id } = req.params;
    await editingTodo(name, id);
    res.status(201).json({
        message: 'sua thanh cong'
    })
}

async function deleteTodo(req, res) {
    const { id } = req.params;
    await deletingTodo(id);
    res.status(201).json({
        message: 'xoa thanh cong'
    })
}

module.exports = {
    render,
    addNewTodo,
    deleteTodo,
    editTodo
}