const express = require('express');
const app = express();

app.use(express.json());

const produtoRoutes = require('./routes/produto.routes');
const responsavelRoutes = require('./routes/responsavel.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const localizacaoRoutes = require('./routes/localizacao.routes');
const usuarioRoutes = require('./routes/usuario.routes');

app.use('/produtos', produtoRoutes);
app.use('/responsaveis', responsavelRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/localizacoes', localizacaoRoutes);
app.use('/usuarios', usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
