// Importa o Pool para gerenciar a conexão com banco de dados (PostgreSQL)
const { Pool } = require('pg');

// Lê variáveis de ambiente do arquivo .env (a URL do banco)
require('dotenv').config();

// Cria um pool de conexões usando a variável DATABASE_URL
const conexao = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Exporta a conexão para ser usada em outras partes do meu projeto
module.exports = conexao;

