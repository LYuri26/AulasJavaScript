// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'formulario_registro'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');

    db.query('USE formulario_registro', (err) => {
        if (err) {
            throw err;
        }

        db.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(255),
      idade INT,
      sexo VARCHAR(10),
      data_nascimento DATE,
      rua VARCHAR(255),
      bairro VARCHAR(255),
      estado VARCHAR(50),
      email VARCHAR(255)
    )`, (err) => {
            if (err) {
                throw err;
            }
            console.log('Tabela de usuários criada ou já existe');
        });
    });
});

app.listen(5000, () => {
    console.log('Servidor está rodando na porta 5000');
});

app.post('/register', (req, res) => {
    const { nome, idade, sexo, dataNascimento, rua, bairro, estado, email } = req.body;

    const sql = `INSERT INTO users (nome, idade, sexo, data_nascimento, rua, bairro, estado, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [nome, idade, sexo, dataNascimento, rua, bairro, estado, email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir os dados:', err);
            res.status(500).send('Erro ao inserir os dados no banco de dados');
        } else {
            console.log('Dados inseridos com sucesso!');
            res.send('Dados registrados com sucesso!');
        }
    });
});

app.post('/initializeDatabase', (req, res) => {
    db.query(`CREATE DATABASE IF NOT EXISTS formulario_registro`, (err) => {
        if (err) {
            throw err;
        }

        res.send('Banco de dados criado com sucesso!');
    });
});
