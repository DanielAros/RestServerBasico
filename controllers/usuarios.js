const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req, res = response) =>{

    const { q, nombre = 'Sin nombre', apikey} = req.query;

    res.json({
        ok: true,
        msg: 'get Hola mundo - controlador',
        q,
        nombre,
        apikey
    })
}

const usuariosPut = (req, res = response) =>{

    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'put Hola mundo',
        id
    })
}

const usuariosPost =  async(req, res = response) =>{
    
    

    const { nombre, email, password, role } = req.body;
    
    const usuario = new Usuario({nombre, email, password, role} );


    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({email});

    if(existeEmail){
        return res.status(400).json({
            error: 'El correo ya existe'
        });
    }

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en base de datos
    await usuario.save();
    
    res.json({
        ok: true,
        msg: 'Post a la api de usuarios',
        usuario
    })
}

const usuariosDelete = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'delete Hola mundo'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}