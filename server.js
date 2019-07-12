const baseRoutes = require ( './back-end/routes/UsuarioRoutes');
const groupRoutes = require ('./back-end/routes/groupRoutes');
const direccionRoutes = require ( './back-end/routes/direccionRoutes');
const pertenecesRoutes = require  ('./back-end/routes/pertenecesRoutes');
const carroRoutes = require ( './back-end/routes/carroRoutes');
const invitacionRoutes = require  ('./back-end/routes/invitacionRoutes');

const express = require('express');
const app = express();
const path = require('path');

        app.use('/api/usuarios', baseRoutes);
        app.use('/api/grupos', groupRoutes);
        app.use('/api/direcciones', direccionRoutes);
        app.use('/api/perteneces', pertenecesRoutes);
        app.use('/api/carros', carroRoutes);
        app.use('/api/invitaciones', invitacionRoutes);

app.use(express.static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

console.log('Console listening')