const Sequelize = require('sequelize');
const connection = require('../database');
const carro = require('./carro');
const direccion = require('./direccion');

const usuario = connection.define('usuario', {
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    edad: Sequelize.STRING,
    cedula: Sequelize.STRING,
    telefono: Sequelize.STRING
});

usuario.belongsTo(carro);
usuario.belongsTo(direccion);


connection.sync();

module.exports = usuario;