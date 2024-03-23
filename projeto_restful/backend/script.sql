-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS restdb;

-- Utilizar o banco de dados
USE restdb;

-- Criar a tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

-- Exemplo de inserção de dados na tabela de usuários
INSERT INTO usuarios (nome, email, senha) VALUES
('Usuário 1', 'usuario1@example.com', 'senha1'),
('Usuário 2', 'usuario2@example.com', 'senha2'),
('Usuário 3', 'usuario3@example.com', 'senha3');
