const Sequelize = require('sequelize');
const connection = require('../database');
const zona = require('./zona');


const direccion = connection.define('direccion', {
    nombre: Sequelize.STRING,
})

direccion.belongsTo(zona);

connection.sync();

module.exports = direccion;