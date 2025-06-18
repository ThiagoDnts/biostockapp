const express = require('express');
const router = express.Router();
const responsavelController = require('../controllers/responsavel.controller');

router.get('/', responsavelController.listarResponsaveis);
router.get('/:id', responsavelController.obterResponsavelPorId);
router.post('/', responsavelController.criarResponsavel);
router.put('/:id', responsavelController.atualizarResponsavel);
router.delete('/:id', responsavelController.deletarResponsavel);

module.exports = router;
