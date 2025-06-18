const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.obterUsuarioPorId);
router.post('/', usuarioController.criarUsuario);
router.put('/:id', usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;
