const sql = require('../config/db.config');
async function getAllTodo() {
    let [result] = await sql.execute('select * from todo order by id desc');
    return result
}

async function addTodo(name) {
    await sql.execute('insert into todo (name) values (?)', [name])
}

async function editingTodo(name, id) {
    await sql.execute('update todo set name = ? where id = ?', [name, id])
}

async function deletingTodo(id) {
    await sql.execute('delete from todo where id = ?', [id])
}
module.exports = {
    getAllTodo,
    addTodo,
    deletingTodo,
    editingTodo
}