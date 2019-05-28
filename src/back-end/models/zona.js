const Sequelize = require('sequelize');
const connection = require('../database');



const zona = connection.define('zona', {
    nombre: Sequelize.STRING,
})

connection.sync();

module.exports = zona;