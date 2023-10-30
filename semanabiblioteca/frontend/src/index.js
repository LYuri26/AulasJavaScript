import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// Antes de renderizar o componente App, faça a requisição para criar_tabela.php
axios.post('http://localhost:3000/backend/criar_tabela.php')
  .then(response => {
    console.log(response.data);
    // Agora, renderize o componente App
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
  })
  .catch(error => {
    console.error('Erro ao criar tabela:', error);
  });

// Se você quiser continuar medindo o desempenho, mantenha esta linha
reportWebVitals();
