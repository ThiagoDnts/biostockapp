const conexao = require('../db');

exports.listarResponsaveis = (req, res) => {
  const sql = 'SELECT * FROM Responsavel';
  conexao.query(sql, (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    res.json(resultados);
  });
};

exports.obterResponsavelPorId = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM Responsavel WHERE idResponsavel = ?';
  conexao.query(sql, [id], (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultados.length === 0) return res.status(404).json({ erro: 'Responsável não encontrado' });
    res.json(resultados[0]);
  });
};

exports.criarResponsavel = (req, res) => {
  const { nmResponsavel, nrTelefone, nmEmail } = req.body;
  const sql = 'INSERT INTO Responsavel (nmResponsavel, nrTelefone, nmEmail) VALUES (?, ?, ?)';
  conexao.query(sql, [nmResponsavel, nrTelefone, nmEmail], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    res.status(201).json({ mensagem: 'Responsável criado', id: resultado.insertId });
  });
};

exports.atualizarResponsavel = (req, res) => {
  const id = req.params.id;
  const { nmResponsavel, nrTelefone, nmEmail } = req.body;
  const sql = 'UPDATE Responsavel SET nmResponsavel = ?, nrTelefone = ?, nmEmail = ? WHERE idResponsavel = ?';
  conexao.query(sql, [nmResponsavel, nrTelefone, nmEmail, id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ erro: 'Responsável não encontrado' });
    res.json({ mensagem: 'Responsável atualizado' });
  });
};

exports.deletarResponsavel = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Responsavel WHERE idResponsavel = ?';
  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ erro: 'Responsável não encontrado' });
    res.json({ mensagem: 'Responsável deletado' });
  });
};
