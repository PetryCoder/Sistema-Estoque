import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


/* Importei o React, ReactDOM e o App, que formam o ponto de entrada da aplicação.
O ReactDOM.createRoot é usado para renderizar o componente App dentro do elemento com id 'root' no HTML.*/