const express = require('express');
const morgan = require('morgan');
const app = express();

//Configuración de la Base de Datos
const {connection} = require('./database');
const {zona} = require('./models/zona');

//Configuracion
app.set('port', process.env.PORT || 3000); 
//Middlewares
app.use(morgan('dev')); //permite ver por consola las peticiones de los usuarios
app.use(express.json()); 
//Rutas
app.use('/api/usuarios',require('./routes/usuario.routes'));
//Inicio del servidor
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});

