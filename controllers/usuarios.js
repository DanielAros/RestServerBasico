const { response, request } = require('express');

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

const usuariosPost =  (req, res = response) =>{
    
    const body = req.body;
    
    res.json({
        ok: true,
        msg: 'post Hola mundo',
        body
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