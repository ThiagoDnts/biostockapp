const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoria.controller');

router.get('/', categoriaController.listarCategorias);
router.get('/:id', categoriaController.obterCategoriaPorId);
router.post('/', categoriaController.criarCategoria);
router.put('/:id', categoriaController.atualizarCategoria);
router.delete('/:id', categoriaController.deletarCategoria);

module.exports = router;
