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

-- Criação da tabela de postagens
CREATE TABLE IF NOT EXISTS postagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_da_imagem VARCHAR(255) NOT NULL,
    curtidas INT DEFAULT 0,
    comentarios INT DEFAULT 0
);

-- Criação da tabela de comentários
CREATE TABLE IF NOT EXISTS comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_postagem INT,
    usuario VARCHAR(255) NOT NULL,
    texto TEXT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_postagem) REFERENCES postagens(id)
);