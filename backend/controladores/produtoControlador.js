const produtoModelo = require('../modelos/produtoModelo');
// Aqui importei o módulo produtoModelo, que contém as funções que 'conversam' com o banco de dados, como listarProdutos, cadastrarProduto, excluirProduto e atualizarProduto.

async function listar(req, res) {
  try {
    const produtos = await produtoModelo.listarProdutos();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error.message);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
// aqui na função listar eu tenho o objetivo de retornar os produtos cadastrados no banco de dados. Juntamente com um console.error para retornar erro caso algo não seja cadastrado.


async function cadastrar(req, res) {
  try {
    const novoProduto = await produtoModelo.cadastrarProduto(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error.message);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
// aqui na função cadastrar acima o objetivo é de cadastrar um novo produto no banco de dados. E novamente com um console.error para retornar erro caso algo não seja cadastrado.

async function excluir(req, res) {
  try {
    const { id } = req.params;
    console.log('Excluindo produto com ID:', id);
    await produtoModelo.excluirProduto(id);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir produto:', error.message);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}
// A função acima 'excluir' realizei caso o usuário deseje excluir o produto com base no ID, isso resultará na exlusão total do produto.

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const dados = req.body;
    const produtoAtualizado = await produtoModelo.atualizarProduto(id, dados);
    res.json(produtoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
}
// a função atualizar, pensei para que o usuário possa de fato usar o sistema, dando baixa no produto, ou adicionando mais produtos ao estoque.

module.exports = { listar, cadastrar, excluir, atualizar };
//Aqui novamente, exporto as funções criadas para que ela sejam acessiveis para outros arquivos que vou utilizar posteriormente durante a criação do sistema.