-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS bibliotecaVirtualDB;

-- Seleção do banco de dados criado
USE bibliotecaVirtualDB;

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Inserindo usuários fictícios na tabela de usuários
INSERT INTO
    usuarios (nome, email, senha)
VALUES
    ('João Silva', 'joao@email.com', 'senha123'),
    ('Maria Oliveira', 'maria@email.com', 'senha456'),
    ('Pedro Santos', 'pedro@email.com', 'senha789');


    