const express = require('express');
const roteador = express.Router();
const produtoControlador = require('../controladores/produtoControlador');

roteador.get('/', produtoControlador.listar);
roteador.post('/', produtoControlador.cadastrar);
roteador.delete('/:id', produtoControlador.excluir);
roteador.put('/:id', produtoControlador.atualizar);

module.exports = roteador;



/*Aqui neste arquivo de 'rotas' tem o objetivo de defionir os caminhos que o usuário pode acessar para interagir com os produtos.
Express: Framework web do Node.js que usamos para criar servidores e APIs.
Roteador: Método do Express para agrupar os caminhos relacionados a produtos.
ProdutoControlador: Módulo que contém as funções que lidam com a lógica de cada caminho (listar, cadastrar, excluir e atualizar)

Das rotas:
GET: Lista todos os produtos cadastrados.
POST: Cadastra um novo produto.
DELETE: Exclui um produto pelo ID.
PUT: Atualiza um produto pelo ID.*/
