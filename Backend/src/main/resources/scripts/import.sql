-- SQL commands

-- NetWork
INSERT INTO network( board_members, description, name, status)VALUES ('Guilherme Palma', 'Network number 01', 'GISP', true);
INSERT INTO network( board_members, description, name, status)VALUES ('Rodrigo Silva', 'Network number 02', 'RSilva', true);
INSERT INTO network( board_members, description, name, status)VALUES ('Paulo Vieira', 'Network number 03','Integritas', true);
-- Institution
INSERT INTO institution( id, address, city, country, district, phone_number, postal_code, description, discipline, governance, type, web_site)
 VALUES (1, 'Av. André Araújo', 'Manaus','Brazil', 'Petrópolis', '(92) 3643-3377', '69080-971', 'INPA - Instituto Nacional de Pesquisas da Amazônia', '', '', '','http://http://portal.inpa.gov.br/');

-- Curator
INSERT INTO curator(id, name, institution_id) VALUES (1,'Richard Vogt', 1);

--Collections
INSERT INTO biodiversity_collection(description, name, preservation_methods, type, web_site, curator_id, institution_id) VALUES
('A Coleção de Anfíbios e Répteis foi implementada em 1985 e conta atualmente com mais de 33.000 espécimes tombados. Cerca de 80% são representados por anfíbios e 20% por répteis. A maior parte do material é conservada em via líquida (álcool 70%) e abriga também material em via seca como carapaça de quelônios e peles de jacarés, acondicionados em armários com naftalina. A coleção possui 10 exemplares typus, sendo 3 holótipos e 7 parátipos.',
 'Coleção de Anfíbios e Répteis', '', 'STRING', '', 1, 1);
