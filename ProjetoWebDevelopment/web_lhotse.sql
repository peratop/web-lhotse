CREATE DATABASE IF NOT EXISTS web_lhotse;

USE web_lhotse;

CREATE TABLE IF NOT EXISTS USUARIO (
    ID_Usuario INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100),
    Email VARCHAR(50),
    Senha VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS produtos (
    ID_Produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    imagem VARCHAR(255),
    preco DECIMAL(10, 2) NOT NULL,
    situacao VARCHAR(50),
    tipo VARCHAR(50) NOT NULL,
    caracteristica1 VARCHAR(255),
    caracteristica2 VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS FAZ_PEDIDO (
    FK_USUARIO_ID_Usuario INT,
    FK_PRODUTO_ID_Produto INT,
    FOREIGN KEY (FK_USUARIO_ID_Usuario) REFERENCES USUARIO(ID_Usuario) ON DELETE RESTRICT,
    FOREIGN KEY (FK_PRODUTO_ID_Produto) REFERENCES produtos(ID_Produto) ON DELETE RESTRICT
);

INSERT INTO produtos (nome, imagem, preco, situacao, tipo, caracteristica1, caracteristica2) VALUES
('L-Urban', 'imagem_urban.jpg', 1200, 'Disponível', 'Urbana', 'Alta performance', 'Ideal para trajetos diários'),
('L-Kids', 'imagem_kids.jpg', 650, 'Disponível', 'Infantil', 'Segura e divertida', 'Ideal para crianças'),
('L-Journey', 'imagem_journey.jpg', 1500, 'Disponível', 'Jornada', 'Conforto e resistência', 'Ideal para longas jornadas'),
('L-Mountain', 'imagem_mountain.jpg', 2500, 'Disponível', 'Montanha', 'Robusta para trilhas', 'Ideal para terrenos acidentados'),
('L-Enduro', 'imagem_enduro.jpg', 2345, 'Disponível', 'Enduro', 'Leve e ágil', 'Ideal para competições de enduro'),
('L-Runner', 'imagem_runner.jpg', 6500, 'Disponível', 'Corrida', 'Extremamente rápida', 'Ideal para corredores profissionais');
