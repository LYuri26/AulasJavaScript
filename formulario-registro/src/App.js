import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    sexo: '',
    dataNascimento: '',
    rua: '',
    bairro: '',
    estado: '',
    pais: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/register', formData)
      .then(response => {
        console.log('Dados enviados com sucesso!', response);
      })
      .catch(error => {
        console.error('Erro ao enviar os dados:', error);
      });
  };

  useEffect(() => {
    const backendUrl = 'http://localhost:5000';

    axios.post(`${backendUrl}/initializeDatabase`)
      .then(response => {
        console.log('Tabelas e banco de dados criados com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao inicializar o banco de dados:', error);
      });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
        </div>
        <div>
          <label>Idade:</label>
          <input type="text" name="idade" value={formData.idade} onChange={handleChange} />
        </div>
        <div>
          <label>Sexo:</label>
          <input type="text" name="sexo" value={formData.sexo} onChange={handleChange} />
        </div>
        <div>
          <label>Data de Nascimento:</label>
          <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
        </div>
        <div>
          <label>Rua:</label>
          <input type="text" name="rua" value={formData.rua} onChange={handleChange} />
        </div>
        <div>
          <label>Bairro:</label>
          <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
        </div>
        <div>
          <label>Estado:</label>
          <input type="text" name="estado" value={formData.estado} onChange={handleChange} />
        </div>
        <div>
          <label>País:</label>
          <input type="text" name="pais" value={formData.pais} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
