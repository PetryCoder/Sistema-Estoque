const conexao = require('../banco/conexao');

// Listar todos os produtos
async function listarProdutos() {
  const { rows } = await conexao.query('SELECT * FROM produtos ORDER BY id');
  return rows;
}

// Cadastrar novo produto (sem 'unidade')
async function cadastrarProduto(produto) {
  const { nome, categoria, cod_barras, estoque_min, estoque_atual } = produto;

  const { rows } = await conexao.query(
    `INSERT INTO produtos (nome, categoria, cod_barras, estoque_min, estoque_atual)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nome, categoria, cod_barras, estoque_min, estoque_atual]
  );

  return rows[0];
}

// Excluir produto pelo ID
async function excluirProduto(id) {
  console.log('Executando DELETE para ID:', id);
  await conexao.query('DELETE FROM produtos WHERE id = $1', [id]);
}

// Atualizar produto pelo ID (sem 'unidade')
async function atualizarProduto(id, produto) {
  const { nome, categoria, cod_barras, estoque_min, estoque_atual } = produto;

  const { rows } = await conexao.query(
    `UPDATE produtos
     SET nome = $1,
         categoria = $2,
         cod_barras = $3,
         estoque_min = $4,
         estoque_atual = $5
     WHERE id = $6
     RETURNING *`,
    [nome, categoria, cod_barras, estoque_min, estoque_atual, id]
  );

  return rows[0];
}

module.exports = {
  listarProdutos,
  cadastrarProduto,
  excluirProduto,
  atualizarProduto,
};
