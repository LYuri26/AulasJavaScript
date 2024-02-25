-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS fullstackfotos;

USE fullstackfotos;

-- Criação da tabela de usuário
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- Inserção de exemplos de usuários
INSERT INTO usuario (nome, email, senha) VALUES
('João Silva', 'joao@example.com', 'senha123'),
('Maria Souza', 'maria@example.com', 'senha456'),
('Pedro Oliveira', 'pedro@example.com', 'senha789');
