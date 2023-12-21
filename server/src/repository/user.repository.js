// code sql
const sql = require('../config/db.config');
async function getUserByEmail(email) {
    let [result] = await sql.execute('select * from user where email = ?', [email])
    return result[0]
}

module.exports = {
    getUserByEmail
}