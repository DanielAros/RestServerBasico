const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();


//Obtener todas las categorias - publico
router.get('/', (req, resp) => {
    resp.json('get');
})

//Obtener unacategoria por id- publico
router.get('/:id', (req, resp) => {
    resp.json('get - id');
})


//Crear categoria - privado - cualquier persona con un token valido
router.post('/', (req, resp) => {
    resp.json('post');
})

//Actualizar - privado - cualquier token valido 
router.put('/:id', (req, resp) => {
    resp.json('put');
})

//Borrar una categoria - Admin
router.delete('/:id', (req, resp) => {
    resp.json('delete');
})



module.exports = router;