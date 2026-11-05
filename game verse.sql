DROP DATABASE IF EXISTS gameverse;
CREATE DATABASE gameverse;
USE gameverse;
CREATE TABLE jogos (
    jogo_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    imagem_url VARCHAR(255) NOT NULL
);
INSERT INTO jogos (nome, categoria, descricao, imagem_url)
VALUES
('Tomb Raider', 'Ação', 'Jogo de aventura e exploração.', 'TombRaider.png'),
('Super Mario World', 'Aventura', 'Aventura de Mario pelo Reino dos Dinossauros.', 'SuperMario.png'),
('Zelda', 'RPG', 'Jogo de aventura em um mundo de fantasia.', 'Zelda.png'),
('Sonic 2', 'Corrida', 'Aventura do Sonic em alta velocidade.', 'Sonic.png'),
('Street Fighter 2', 'Ação', 'Jogo de luta entre diferentes personagens.', 'StreetFitghter2.png'),
('Donkey Kong', 'Aventura', 'Aventura protagonizada por Donkey Kong.', 'DonkeyKong.png');