const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValio = async(rol = '') => {
    const existeRol = await Role.findOne({rol});

    if(!existeRol){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }

}

const emailExiste = async(email = '') => {
    const existeEmail = await Usuario.findOne({email});

    if(existeEmail){
        throw new Error(`El correo ${ email } ya esta registrado`);
    }
}


const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);


    if( !existeUsuario ){
        throw new Error(`El id no existe ${ id }`);
    }
}


module.exports = {
    esRoleValio,
    emailExiste,
    existeUsuarioPorId
}