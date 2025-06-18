const express = require('express');
const router = express.Router();
const localizacaoController = require('../controllers/localizacao.controller');

router.get('/', localizacaoController.listarLocalizacoes);
router.get('/:id', localizacaoController.obterLocalizacaoPorId);
router.post('/', localizacaoController.criarLocalizacao);
router.put('/:id', localizacaoController.atualizarLocalizacao);
router.delete('/:id', localizacaoController.deletarLocalizacao);

module.exports = router;
