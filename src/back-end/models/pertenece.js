const Sequelize = require('sequelize');
const connection = require('../database');
const usuario = require('./usuario');
const grupo = require('./grupo');

const pertenece = connection.define('pertenece', {
    
    
});

pertenece.belongsTo(usuario);
pertenece.belongsTo(grupo);


connection.sync();

module.exports = pertenece;