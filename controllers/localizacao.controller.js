const conexao = require('../db');

exports.listarLocalizacoes = (req, res) => {
  const sql = 'SELECT * FROM Localizacao';
  conexao.query(sql, (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    res.json(resultados);
  });
};

exports.obterLocalizacaoPorId = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM Localizacao WHERE idLocalizacao = ?';
  conexao.query(sql, [id], (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultados.length === 0) return res.status(404).json({ erro: 'Localização não encontrada' });
    res.json(resultados[0]);
  });
};

exports.criarLocalizacao = (req, res) => {
  const { nmLocalizacao, dsLocalizacao } = req.body;
  const sql = 'INSERT INTO Localizacao (nmLocalizacao, dsLocalizacao) VALUES (?, ?)';
  conexao.query(sql, [nmLocalizacao, dsLocalizacao], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    res.status(201).json({ mensagem: 'Localização criada', id: resultado.insertId });
  });
};

exports.atualizarLocalizacao = (req, res) => {
  const id = req.params.id;
  const { nmLocalizacao, dsLocalizacao } = req.body;
  const sql = 'UPDATE Localizacao SET nmLocalizacao = ?, dsLocalizacao = ? WHERE idLocalizacao = ?';
  conexao.query(sql, [nmLocalizacao, dsLocalizacao, id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ erro: 'Localização não encontrada' });
    res.json({ mensagem: 'Localização atualizada' });
  });
};

exports.deletarLocalizacao = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Localizacao WHERE idLocalizacao = ?';
  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ erro: 'Localização não encontrada' });
    res.json({ mensagem: 'Localização deletada' });
  });
};
