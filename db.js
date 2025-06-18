const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Catolica123',
  database: 'biostockapp'
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

module.exports = conexao;
