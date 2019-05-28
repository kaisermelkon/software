const Sequelize = require('sequelize');

const connection = new Sequelize('ea', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});



connection.sync()
    .then(()=>{
        console.log("conexion establecida");
    })
    .catch((err)=>{
        console.log("error en la conexcion ",err);
    })

module.exports = connection;