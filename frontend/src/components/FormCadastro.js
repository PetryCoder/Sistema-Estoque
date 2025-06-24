import React, { useState } from 'react';
import axios from 'axios';

function FormCadastro({ onProdutoCadastrado }) {
  const [form, setForm] = useState({
    nome: '',
    categoria: '',
    cod_barras: '',
    unidade: '',
    estoque_min: '',
    estoque_atual: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/api/produtos', {
      ...form,
      estoque_min: Number(form.estoque_min),
      estoque_atual: Number(form.estoque_atual)
    })
      .then(response => {
        alert('Produto cadastrado com sucesso!');
        setForm({
          nome: '',
          categoria: '',
          cod_barras: '',
          unidade: '',
          estoque_min: '',
          estoque_atual: ''
        });
        onProdutoCadastrado(); // para atualizar a lista
      })
      .catch(error => alert('Erro ao cadastrar produto.'));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Produto</h2>
      <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
      <input name="categoria" value={form.categoria} onChange={handleChange} placeholder="Categoria" required />
      <input name="cod_barras" value={form.cod_barras} onChange={handleChange} placeholder="Código de Barras" required />
      <input name="unidade" value={form.unidade} onChange={handleChange} placeholder="Unidade" required />
      <input name="estoque_min" value={form.estoque_min} onChange={handleChange} placeholder="Estoque Mínimo" type="number" required />
      <input name="estoque_atual" value={form.estoque_atual} onChange={handleChange} placeholder="Estoque Atual" type="number" required />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default FormCadastro;
