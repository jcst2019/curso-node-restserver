
const { Router } = require('express');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();


router.get('/', usuariosGet );

//router.put('/:id', usuariosPut );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ), 
    validarCampos
],usuariosPut );

//router.post('/', usuariosPost );
router.post('/',[
check('nombre','El Nombre es Obligatorio').not().isEmpty(),
check('password','El password es Obligatorio y más de 6 caracteres').isLength({min:6}),
check('correo','El correo No es valido').isEmail(),
//check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
check('rol').custom(esRoleValido), // Es equivalente a (rol =>esRoleValido(rol) )
check('correo').custom(emailExiste), // Es equivalente a (rol =>esRoleValido(rol) )
validarCampos
], usuariosPost );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );

router.patch('/', usuariosPatch );


module.exports = router;