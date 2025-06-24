// Importa o Pool para gerenciar conexões com PostgreSQL
const { Pool } = require('pg');

// Lê variáveis de ambiente do arquivo .env (por exemplo, a URL do banco)
require('dotenv').config();

// Cria um pool de conexões usando a variável de ambiente DATABASE_URL
const conexao = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Exporta a conexão para ser usada em outras partes do projeto
module.exports = conexao;

