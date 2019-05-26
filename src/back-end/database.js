const Sequelize = require('sequelize');

const connection = new Sequelize('ea', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

var usuario = connection.define('usuario', {
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    profesion: Sequelize.STRING
})

connection.sync()
    .then(()=>{
        console.log("conexion establecida");
    })
    .catch((err)=>{
        console.log("error en la conexcion ",err);
    })

module.exports = connection;