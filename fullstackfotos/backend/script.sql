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

-- Inserção de exemplos de postagens
INSERT INTO postagens (nome_da_imagem) VALUES
('aeradocapitalimprodutivo.jpg'),
('aorigemdafamíliadapropriedadeprivadaedoestado.jpg'),
('vigiarepunir.jpg'),
('asveiasabertasdaamericalatina.jpg'),
('democraciaelutadeclasses.jpg'),
('olivrovermelho.jpg'),
('desigualdadeecaminhosparaumasociedademaisjusta.jpg'),
('manifestocomunista.jpg');

-- Criação da tabela de comentários
CREATE TABLE IF NOT EXISTS comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_postagem INT,
    usuario VARCHAR(255) NOT NULL,
    texto TEXT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_postagem) REFERENCES postagens(id)
);

-- Criação da tabela de curtidas
CREATE TABLE IF NOT EXISTS curtidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_postagem INT,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_postagem) REFERENCES postagens(id)
);

-- Trigger para adicionar curtida
DELIMITER $$
CREATE TRIGGER after_insert_like
AFTER INSERT ON curtidas
FOR EACH ROW
BEGIN
    UPDATE postagens SET curtidas = curtidas + 1 WHERE id = NEW.id_postagem;
END$$
DELIMITER ;

-- Trigger para remover curtida
DELIMITER $$
CREATE TRIGGER after_delete_like
AFTER DELETE ON curtidas
FOR EACH ROW
BEGIN
    UPDATE postagens SET curtidas = curtidas - 1 WHERE id = OLD.id_postagem;
END$$
DELIMITER ;

-- Trigger para adicionar comentário
DELIMITER $$
CREATE TRIGGER after_insert_comment
AFTER INSERT ON comentarios
FOR EACH ROW
BEGIN
    UPDATE postagens SET comentarios = comentarios + 1 WHERE id = NEW.id_postagem;
END$$
DELIMITER ;

-- Trigger para remover comentário
DELIMITER $$
CREATE TRIGGER after_delete_comment
AFTER DELETE ON comentarios
FOR EACH ROW
BEGIN
    UPDATE postagens SET comentarios = comentarios - 1 WHERE id = OLD.id_postagem;
END$$
DELIMITER ;
