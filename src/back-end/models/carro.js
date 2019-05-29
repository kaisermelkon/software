const Sequelize = require('sequelize');
const connection = require('../database');


const carro = connection.define('carro', {
    placa: Sequelize.STRING,
    color: Sequelize.STRING,
    ano: Sequelize.STRING,
    marca: Sequelize.STRING,
    modelo: Sequelize.STRING
});


connection.sync();

module.exports = carro;