const express = require('express');
const roteador = express.Router();
const produtoControlador = require('../controladores/produtoControlador');

roteador.get('/', produtoControlador.listar);
roteador.post('/', produtoControlador.cadastrar);
roteador.delete('/:id', produtoControlador.excluir);
roteador.put('/:id', produtoControlador.atualizar);

module.exports = roteador;
