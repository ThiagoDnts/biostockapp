const conexao = require('../db');

exports.listarCategorias = (req, res) => {
  const sql = 'SELECT * FROM Categoria';
  conexao.query(sql, (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    res.json(resultados);
  });
};

exports.obterCategoriaPorId = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM Categoria WHERE idCategoria = ?';
  conexao.query(sql, [id], (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultados.length === 0) return res.status(404).json({ erro: 'Categoria não encontrada' });
    res.json(resultados[0]);
  });
};

exports.criarCategoria = (req, res) => {
  const { nmCategoria, dsCategoria } = req.body;
  const sql = 'INSERT INTO Categoria (nmCategoria, dsCategoria) VALUES (?, ?)';
  conexao.query(sql, [nmCategoria, dsCategoria], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    res.status(201).json({ mensagem: 'Categoria criada', id: resultado.insertId });
  });
};

exports.atualizarCategoria = (req, res) => {
  const id = req.params.id;
  const { nmCategoria, dsCategoria } = req.body;
  const sql = 'UPDATE Categoria SET nmCategoria = ?, dsCategoria = ? WHERE idCategoria = ?';
  conexao.query(sql, [nmCategoria, dsCategoria, id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ erro: 'Categoria não encontrada' });
    res.json({ mensagem: 'Categoria atualizada' });
  });
};

exports.deletarCategoria = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Categoria WHERE idCategoria = ?';
  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ erro: 'Categoria não encontrada' });
    res.json({ mensagem: 'Categoria deletada' });
  });
};
