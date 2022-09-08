const { response, json } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ email });

        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            });
        }

        //Si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //Verificar la contrasena
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            msg: 'login ok',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try{
        const {nombre, img, email}  = await googleVerify( id_token );

        //
        let usuario = await Usuario.findOne({ email });

        console.log(usuario);

        if( !usuario ){
            //Crear usuario
            const data = {
                nombre,
                email,
                password: 'oo',
                // img,
                google: true,
                role: 'USER_ROLE'
            };
            
            //console.log(data);
            usuario = new Usuario( data );
            await usuario.save();
        }

        // // Si el usuario en DB
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        console.log(usuario);
        // Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            usuario,
            token
        })

    }catch( error ){
        res.status(400).json({
            ok: false,
            msg: 'Token no se pudo verificar'
        });
    }
}

module.exports = {
    login,
    googleSignIn
}