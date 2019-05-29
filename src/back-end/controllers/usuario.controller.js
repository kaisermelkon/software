const Sequelize = require('sequelize');
const usuario = require('../models/usuario');
const usuarioCtrl = {};

usuarioCtrl.getUsuarios =  (req, res) =>{
    usuario.findAll()
        .then(usuarios =>{
            console.log(usuarios);
            res.json(usuarios);
        })
        .catch(err => console.log(err))
}

usuarioCtrl.createUsuario = (req,res) =>{
       usuario.create({
         nombre: req.nombre,
         telefono: req.telefono,
         correo: req.correo
     })

     }


usuarioCtrl.editUsuario = (req,res) =>{


}

usuarioCtrl.deleteUsuario= (req,res) =>{

}

module.exports = usuarioCtrl;