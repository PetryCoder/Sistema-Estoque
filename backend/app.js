const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//  A baixo eu importei e useis as rotas
const produtoRotas = require('./rotas/produtoRotas');
app.use('/api/produtos', produtoRotas);

// Teste se o servidor está vivo
app.get('/', (req, res) => {
  res.send('API do sistema de estoque está funcionando!');
});

// Inicia o servidor
const PORTA = process.env.PORT || 3001;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});

