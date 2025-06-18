const conexao = require('../db');

exports.listarUsuarios = (req, res) => {
  const sql = 'SELECT * FROM Usuario';
  conexao.query(sql, (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    res.json(resultados);
  });
};

exports.obterUsuarioPorId = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM Usuario WHERE idUsuario = ?';
  conexao.query(sql, [id], (erro, resultados) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultados.length === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(resultados[0]);
  });
};

exports.criarUsuario = (req, res) => {
  const { nmUsuario, nmEmail, nmLogin, nmSenha, status } = req.body;
  const sql = 'INSERT INTO Usuario (nmUsuario, nmEmail, nmLogin, nmSenha, status) VALUES (?, ?, ?, ?, ?)';
  conexao.query(sql, [nmUsuario, nmEmail, nmLogin, nmSenha, status], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    res.status(201).json({ mensagem: 'Usuário criado', id: resultado.insertId });
  });
};

exports.atualizarUsuario = (req, res) => {
  const id = req.params.id;
  const { nmUsuario, nmEmail, nmLogin, nmSenha, status } = req.body;
  const sql = 'UPDATE Usuario SET nmUsuario = ?, nmEmail = ?, nmLogin = ?, nmSenha = ?, status = ? WHERE idUsuario = ?';
  conexao.query(sql, [nmUsuario, nmEmail, nmLogin, nmSenha, status, id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json({ mensagem: 'Usuário atualizado' });
  });
};

exports.deletarUsuario = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Usuario WHERE idUsuario = ?';
  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) return res.status(500).json({ erro: erro.message });
    if (resultado.affectedRows === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json({ mensagem: 'Usuário deletado' });
  });
};
