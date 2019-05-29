const Sequelize = require('sequelize');
const connection = require('../database');
const usuario = require('./usuario');
const grupo = require('./grupo');

const horario = connection.define('horario', {
    hora: Sequelize.STRING,
    
});

horario.belongsTo(usuario);
horario.belongsTo(grupo);


connection.sync();

module.exports = horario;