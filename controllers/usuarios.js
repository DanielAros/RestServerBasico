const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) =>{

    // const { q, nombre = 'Sin nombre', apikey} = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,  
        usuarios
    })
}

const usuariosPut = async (req, res = response) =>{

    const { id } = req.params;
    const { _id,  password, google, email,  ...resto } = req.body;

    //TODO validar contra base de datos
    if( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

    res.json(usuario);
}

const usuariosPost =  async(req, res = response) =>{
    
    const { nombre, email, password, role } = req.body;
    
    const usuario = new Usuario({nombre, email, password, role} );


    // Verificar si el correo existe
    

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

const usuariosDelete = async(req, res = response) =>{
    const { id } = req.params;

    //console.log(id)

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});
    //console.log(usuario);

    res.json({
        'msg': 'delete API - controlador',
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}