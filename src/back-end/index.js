const express = require('express');
const morgan = require('morgan');
const app = express();

//Configuración de la Base de Datos
const {connection} = require('./database');
const {zona} = require('./models/zona');
const {direccion} = require('./models/direccion');
const {carro} = require('./models/carro');
const {usuario} = require('./models/usuario');
const {grupo} = require('./models/grupo');
const {pertenece} = require('./models/pertenece');
const {horario} = require('./models/horario');


//Configuracion
app.set('port', process.env.PORT || 3000); 
//Middlewares
app.use(morgan('dev')); //permite ver por consola las peticiones de los usuarios
app.use(express.json()); 
//Rutas
//app.use('/api/usuarios',require('./routes/usuario.routes'));
//Inicio del servidor
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});

