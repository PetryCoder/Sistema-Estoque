Guia para Testar o Sistema de Estoque Localmente
 Requisitos:
Node.js instalado https://nodejs.org/
PostgreSQL instalado e funcionando
Git instalado (opcional, mas recomendado)
Visual Studio Code (opcional, recomendado)


1. Clonar o Projeto do GitHub
Abra o terminal ou o Git Bash e execute:
rgit clone https://github.com/PetryCoder/Sistema-Estoque.git
cd Sistema-Estoque
2. Configurar o Banco de Dados PostgreSQL
Abra o pgAdmin


Crie um banco de dados com o nome:
CREATE DATABASE estoque_db;
Em seguida, crie a tabela:
CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome TEXT,
  categoria TEXT,
  cod_barras TEXT,
  estoque_min INTEGER,
  estoque_atual INTEGER
);

3. Configurar o Backend (Servidor Node.js)
No terminal, vá para a pasta backend:
cd backend (comando para entrar na pasta backend)

Crie um arquivo .env (dentro da pasta backend) com o conteúdo abaixo:
PORT=3001
DATABASE_URL=postgresql://postgres:sua_senha@localhost:5432/estoque_db

Troque sua_senha pela senha real do PostgreSQL que está instalada na máquina.
Instale as dependências:
npm install
Inicie o backend (no terminal da pasta backend):
npm run dev

Você verá algo como:
Servidor rodando na porta 3001
4. Rodar o Frontend (React)
Em outro terminal, vá para a pasta do frontend:
cd frontend (comando para entrar na pasta frontend)
Instale as dependências:
npm install
Inicie a aplicação (no terminal frontend):
npm start
O navegador abrirá automaticamente em:
http://localhost:3000

Assim conseguirá testar o projeto
