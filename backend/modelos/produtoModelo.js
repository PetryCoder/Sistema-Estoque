const conexao = require('../banco/conexao');
// no const acima importei a conexão com o banco de dados 'criado no arquivo conexao.js'.

async function listarProdutos() {
  const { rows } = await conexao.query('SELECT * FROM produtos ORDER BY id');
  return rows;
}
// Na função acima vou listar todos os produtos, ordenados por ID para manter uma organização melhor.


async function cadastrarProduto(produto) {
  const { nome, categoria, cod_barras, estoque_min, estoque_atual } = produto;

  const { rows } = await conexao.query(
    `INSERT INTO produtos (nome, categoria, cod_barras, estoque_min, estoque_atual)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nome, categoria, cod_barras, estoque_min, estoque_atual]
  );

  return rows[0];
}
// A função CadastrarProduto recebe as informaçãoes do produto novo e insere no banco de dados, retornando o produto já cadastrado


async function excluirProduto(id) {
  console.log('Executando DELETE para ID:', id);
  await conexao.query('DELETE FROM produtos WHERE id = $1', [id]);
}
// Aqui acima temos a função excluirProduto, que recebe o ID do produto e o exclui do banco de dados, retornando um console.log para confirmar que foi excluido.

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
// Função atualizarProduto recebe o ID do produto e as novas informações, atualizando o produto no banco de dados e retornando o produto atualizado.

module.exports = {
  listarProdutos,
  cadastrarProduto,
  excluirProduto,
  atualizarProduto,
};
//Aqui novamente exporto as funções criadas para que elas sejam acessíveis em outros arquivos.
