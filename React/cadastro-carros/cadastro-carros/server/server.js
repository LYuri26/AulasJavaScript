const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

// Configurações do banco de dados
const DB_NAME = "react";
const DB_USER = "root";
const DB_PASSWORD = "";
const DB_HOST = "localhost";

// Inicialização do aplicativo Express
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

// Definição do modelo do carro
const Carro = sequelize.define("Carro", {
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sincronização do modelo com o banco de dados
sequelize
  .sync()
  .then(() => {
    console.log("Tabela criada com sucesso");
  })
  .catch((err) => {
    console.error("Erro ao criar tabela:", err);
  });

// Rotas
// Rota para listar carros
app.get("/carros", async (req, res) => {
  try {
    const carros = await Carro.findAll();
    res.json(carros);
  } catch (err) {
    console.error("Erro ao buscar carros:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Rota para cadastrar um carro
app.post("/carros", async (req, res) => {
  const { modelo, marca, ano } = req.body;
  try {
    const novoCarro = await Carro.create({ modelo, marca, ano });
    res.json(novoCarro); // Retornar o novo carro criado
  } catch (err) {
    console.error("Erro ao inserir registro:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
