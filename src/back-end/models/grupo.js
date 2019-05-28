const Sequelize = require('sequelize');
const connection = require('../database');
const usuario = require('./usuario');
const direccion = require('./direccion');

const grupo = connection.define('grupo', {
    nombre: Sequelize.STRING,
    
});

grupo.belongsTo(usuario);
grupo.belongsTo(direccion);


connection.sync();

module.exports = grupo;