async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
    host: '108.179.253.70',
    user: 'achefa59_devVini',
    password: 'Bertold#123456',
    database: 'achefa59_BF_homologacao'
});
console.log("Conectou bem seu vagabundo");
global.connection = connection;
return connection;
}
connect();

async function users(){
    const conn = await connect();
    return await conn.query('select * from REGISTROS;'); 
}

module.exports = {users} //vini
