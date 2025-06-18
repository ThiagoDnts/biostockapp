const conexao = require('../db');

exports.listarProdutos = (req, res) => {
  const sql = `SELECT * FROM Produto`;
  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }
    res.json(resultados);
  });
};

exports.obterProdutoPorId = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM Produto WHERE idProduto = ?`;
  conexao.query(sql, [id], (erro, resultados) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(resultados[0]);
  });
};

exports.criarProduto = (req, res) => {
  const {
    nmProduto,
    nmPreço,
    qtProduto,
    dtCadastro,
    idResponsavel,
    idCategoria,
    idLocalizacao,
    idUsuario
  } = req.body;

  const sql = `
    INSERT INTO Produto
    (nmProduto, nmPreço, qtProduto, dtCadastro, idResponsavel, idCategoria, idLocalizacao, idUsuario)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conexao.query(sql, [nmProduto, nmPreço, qtProduto, dtCadastro, idResponsavel, idCategoria, idLocalizacao, idUsuario], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }
    res.status(201).json({ mensagem: 'Produto criado', id: resultado.insertId });
  });
};

exports.atualizarProduto = (req, res) => {
  const id = req.params.id;
  const {
    nmProduto,
    nmPreço,
    qtProduto,
    dtCadastro,
    idResponsavel,
    idCategoria,
    idLocalizacao,
    idUsuario
  } = req.body;

  const sql = `
    UPDATE Produto SET
    nmProduto = ?, nmPreço = ?, qtProduto = ?, dtCadastro = ?,
    idResponsavel = ?, idCategoria = ?, idLocalizacao = ?, idUsuario = ?
    WHERE idProduto = ?
  `;

  conexao.query(sql, [nmProduto, nmPreço, qtProduto, dtCadastro, idResponsavel, idCategoria, idLocalizacao, idUsuario, id], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json({ mensagem: 'Produto atualizado' });
  });
};

exports.deletarProduto = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM Produto WHERE idProduto = ?`;
  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) {
      return res.status(500).json({ erro: erro.message });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json({ mensagem: 'Produto deletado' });
  });
};
