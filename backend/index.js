(async() =>{
const db = require('./config');
console.log("rodando");
console.log('select * from REGISTROS');
const usuario = db.users();
console.log(usuario); 
})();