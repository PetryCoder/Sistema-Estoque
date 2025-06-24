const produtoModelo = require('../modelos/produtoModelo');

async function listar(req, res) {
  try {
    const produtos = await produtoModelo.listarProdutos();
    res.json(produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error.message);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

async function cadastrar(req, res) {
  try {
    const novoProduto = await produtoModelo.cadastrarProduto(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error.message);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

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

module.exports = { listar, cadastrar, excluir, atualizar };
