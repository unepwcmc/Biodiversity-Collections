-- SQL commands

-- NetWork
INSERT INTO network( board_members, description, name, status)VALUES ('Guilherme Palma', 'Network number 01', 'GISP', true);
INSERT INTO network( board_members, description, name, status)VALUES ('Rodrigo Silva', 'Network number 02', 'RSilva', true);
INSERT INTO network( board_members, description, name, status)VALUES ('Paulo Vieira', 'Network number 03','Integritas', true);
-- Institution
INSERT INTO institution( id, address, city, country, district, phone_number, postal_code, description, discipline, governance, type, web_site)
 VALUES (1, 'Av. Andr� Ara�jo', 'Manaus','Brazil', 'Petr�polis', '(92) 3643-3377', '69080-971', 'INPA - Instituto Nacional de Pesquisas da Amaz�nia', '', '', '','http://http://portal.inpa.gov.br/');

-- Curator
INSERT INTO curator(id, name, institution_id) VALUES (1,'Richard Vogt', 1);

--Collections
INSERT INTO biodiversity_collection(description, name, preservation_methods, type, web_site, curator_id, institution_id) VALUES
('A Cole��o de Anf�bios e R�pteis foi implementada em 1985 e conta atualmente com mais de 33.000 esp�cimes tombados. Cerca de 80% s�o representados por anf�bios e 20% por r�pteis. A maior parte do material � conservada em via l�quida (�lcool 70%) e abriga tamb�m material em via seca como carapa�a de quel�nios e peles de jacar�s, acondicionados em arm�rios com naftalina. A cole��o possui 10 exemplares typus, sendo 3 hol�tipos e 7 par�tipos.',
 'Cole��o de Anf�bios e R�pteis', '', 'STRING', '', 1, 1);
