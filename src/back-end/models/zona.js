const Sequelize = require('sequelize');
const {connection} = require('../database');
const Model = Sequelize.Model;

class zona extends Model {}
zona.init({
  nombre: Sequelize.STRING,
 
}, { sequelize, modelName: 'zona' });

module.exports = zona;