var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

const Sequelize = require('sequelize');

const sequelize = new Sequelize('muPrueba', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize
    .authenticate().then(()=>{
    console.log('conexion establecida');

    })
    .catch(err =>{
        console.log('error en la conexion')
    });

    const Model = Sequelize.Model;
    class User extends Model {}
    User.init({
      // attributes
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
      }
    }, {
      sequelize,
      modelName: 'user'
      // options
    });

    sequelize.sync();