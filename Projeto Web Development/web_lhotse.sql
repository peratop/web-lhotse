CREATE DATABASE web_lhotse;

USE web_lhotse;

CREATE TABLE USUARIO (
    Nome VARCHAR(100),
    Email VARCHAR(50),
    Senha VARCHAR(40),
    ID_Usuario Int PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE PRODUTO (
    ID_Produto INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100),
    Valor DECIMAL (10,2),
    Descricao VARCHAR(100)
);

CREATE TABLE FAZ_PEDIDO (
    FK_USUARIO_ID_Usuario Int,
    FK_PRODUTO_ID_Produto INT
);
 
ALTER TABLE FAZ_PEDIDO ADD CONSTRAINT FK_FAZ_PEDIDO_1
    FOREIGN KEY (FK_USUARIO_ID_Usuario)
    REFERENCES USUARIO (ID_Usuario)
    ON DELETE RESTRICT;
 
ALTER TABLE FAZ_PEDIDO ADD CONSTRAINT FK_FAZ_PEDIDO_2
    FOREIGN KEY (FK_PRODUTO_ID_Produto)
    REFERENCES PRODUTO (ID_Produto)
    ON DELETE RESTRICT;


INSERT INTO PRODUTO (Nome, Valor, Descricao) VALUES 
('L-Urban', 1200, 'Bicicleta urbana de alta performance para trajetos diários.'),
('L-Kids', 650, 'Bicicleta infantil segura e divertida para crianças.'),
('L-Journey', 1500, 'Bicicleta para longas jornadas com conforto e resistência.'),
('L-Mountain', 2500, 'Bicicleta robusta para trilhas e terrenos acidentados.'),
('L-Enduro', 2345, 'Bicicleta para competições de enduro, leve e ágil.'),
('L-Runner', 6500, 'Bicicleta de corrida para profissionais, extremamente rápida e leve.');
