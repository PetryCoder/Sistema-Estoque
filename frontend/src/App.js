import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
//Importamos novamente React e axios, além do Bootstrap para o estilo

function App() {
  const [logado, setLogado] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
    categoria: "",
    cod_barras: "",
    estoque_min: "",
    estoque_atual: "",
  });
  const [busca, setBusca] = useState("");
  const [modoEdicao, setModoEdicao] = useState(false);

  const carregarProdutos = () => {
    axios
      .get("http://localhost:3001/api/produtos")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao carregar produtos:", err));
  };
  //Acima criei a const [logado, setLogado] = useState(false); que cria uma tela de login falsa (falsa, para facilitar o teste) mas é possível fazer uma tela de login real com autenticação.)

  useEffect(() => {
    if (logado) carregarProdutos();
  }, [logado]);
// quando logado for verdade, funcáo carregarProdutos() é chamada para buscar os produtos do backend.

  const produtosFiltrados = produtos.filter((p) => {
    const textoBusca = busca.toLowerCase();
    return (
      p.nome.toLowerCase().includes(textoBusca) ||
      p.categoria.toLowerCase().includes(textoBusca) ||
      p.cod_barras.toLowerCase().includes(textoBusca) ||
      p.estoque_min.toString().includes(textoBusca)
    );
  });
//const produtosFiltrados filtra os produtos com base no digitado na busca.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((old) => ({ ...old, [name]: value }));
  };
// // Função handleChange atualiza o formulário com o que o usuário digitou.

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nome || !form.categoria || !form.cod_barras ||
      form.estoque_min === "" || form.estoque_atual === ""
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    const dados = {
      nome: form.nome,
      categoria: form.categoria,
      cod_barras: form.cod_barras,
      estoque_min: Number(form.estoque_min),
      estoque_atual: Number(form.estoque_atual),
    };

    const requisicao = modoEdicao
      ? axios.put(`http://localhost:3001/api/produtos/${form.id}`, dados)
      : axios.post("http://localhost:3001/api/produtos", dados);

    requisicao
      .then(() => {
        alert(modoEdicao ? "Produto atualizado!" : "Produto cadastrado!");
        setForm({
          id: null,
          nome: "",
          categoria: "",
          cod_barras: "",
          estoque_min: "",
          estoque_atual: "",
        });
        setModoEdicao(false);
        carregarProdutos();
      })
      .catch(() => {
        alert("Erro ao cadastrar/atualizar produto!");
      });
  };

  const excluirProduto = (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    axios
      .delete(`http://localhost:3001/api/produtos/${id}`)
      .then(() => {
        alert("Produto excluído com sucesso!");
        carregarProdutos();
      })
      .catch((err) => {
        alert("Erro ao excluir produto!");
        console.error(err);
      });
  };
// o axios.delete é usado para excluir o produto selecionado, e a lista de produtos é atualizada após a exclusão.

  const iniciarEdicao = (produto) => {
    setForm(produto);
    setModoEdicao(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
// A função iniciarEdicao preenche o formulário com os dados do produto que foi selecionado para ser editado.

  const handleLogin = (e) => {
    e.preventDefault();
    setLogado(true);
  };

  // Tela de login
  if (!logado) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card p-4 shadow-lg" style={{ maxWidth: 400, width: "100%" }}>
          <h3 className="text-center mb-4">Acesso ao Estoque</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Usuário</label>
              <input type="text" className="form-control" required placeholder="Digite qualquer nome" />
            </div>
            <div className="mb-3">
              <label className="form-label">Senha</label>
              <input type="password" className="form-control" required placeholder="Digite qualquer senha" />
            </div>
            <button type="submit" className="btn btn-primary w-100">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 shadow-lg p-4 rounded bg-white">
      <h1 className="text-center mb-4">📦 Sistema de Estoque - Lucas Store 📦</h1>

      <section className="mb-5 p-4 border rounded shadow-sm bg-light">
        <h2 className="mb-4 text-center">{modoEdicao ? "Editar Produto" : "Cadastrar Produto"}</h2>
        <form onSubmit={handleSubmit}>

          {/* Nome sozinho, centralizado e destacado */}
          <div className="mb-4">
            <input
              name="nome"
              placeholder="Produto"
              value={form.nome}
              onChange={handleChange}
              className="form-control text-center fs-4"
              required
            />
          </div>

          {/* Os demais campos em linha */}
          <div className="row g-3">
            <div className="col-md-3">
              <input
                name="categoria"
                placeholder="Categoria"
                value={form.categoria}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                name="cod_barras"
                placeholder="Código de Barras"
                value={form.cod_barras}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3">
              <input
                name="estoque_min"
                type="number"
                placeholder="Estoque Mínimo"
                value={form.estoque_min}
                onChange={handleChange}
                className="form-control"
                required
                min="0"
              />
            </div>
            <div className="col-md-3">
              <input
                name="estoque_atual"
                type="number"
                placeholder="Estoque Atual"
                value={form.estoque_atual}
                onChange={handleChange}
                className="form-control"
                required
                min="0"
              />
            </div>
          </div>

          <button type="submit" className={`btn mt-4 w-100 ${modoEdicao ? "btn-warning" : "btn-success"}`}>
            {modoEdicao ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </section>

      <section className="mb-3">
        <input
          type="text"
          placeholder="Buscar por nome, categoria ou código..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="form-control"
        />
      </section>

      <section>
        <h2 className="mb-3">Produtos Cadastrados</h2>
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Código de Barras</th>
                <th>Estoque Mínimo</th>
                <th>Estoque Atual</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-3">Nenhum produto encontrado.</td>
                </tr>
              ) : (
                produtosFiltrados.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nome}</td>
                    <td>{p.categoria}</td>
                    <td>{p.cod_barras}</td>
                    <td>{p.estoque_min}</td>
                    <td>{p.estoque_atual}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => iniciarEdicao(p)}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => excluirProduto(p.id)}>Excluir</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;


// Os DIVs, FORM, INPUTS e BUTTONS foram estilizados com classes do Bootstrap para melhorar a aparência da página.