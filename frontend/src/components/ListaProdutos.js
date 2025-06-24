import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/produtos')
      .then(response => setProdutos(response.data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div>
      <h2>Produtos Cadastrados</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>Categoria</th><th>Código de Barras</th><th>Unidade</th><th>Estoque Mínimo</th><th>Estoque Atual</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.categoria}</td>
              <td>{p.cod_barras}</td>
              <td>{p.unidade}</td>
              <td>{p.estoque_min}</td>
              <td>{p.estoque_atual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaProdutos;
