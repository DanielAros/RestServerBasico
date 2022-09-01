
const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos} = require('../middlewares/validarCampos');

const {usuariosGet, usuariosPut, usuariosPost, usuariosDelete} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mas de 6 letas').isLength({min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
] , usuariosPost);

router.delete('/', usuariosDelete);

module.exports = router;