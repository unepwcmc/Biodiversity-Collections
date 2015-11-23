-- SQL commands

-- NetWork
INSERT INTO network ( id, board_members, description, name, status ) VALUES (1, 'Guilherme Palma', 'Lorem ipsum dolor sit amet, essent percipitur at mea, vim ea partem eruditi mandamus, sint dolore nam ex. Sit et nonumes vulputate sententiae. Mutat movet ocurreret an sit, at sonet definiebas quo, est ne menandri molestiae. No sed suas veritus necessitatibus, vix suas case semper ut, quod omittam explicari ei eum. Vix quando minimum in, cu vide copiosae constituto his.', 'Network ipsum dolor sit amet', true);
INSERT INTO network ( id, board_members, description, name, status ) VALUES (2, 'Rodrigo Silva', 'Euismod laboramus neglegentur ea eum. Ut mei aperiam dolores sadipscing. Mel possim detracto ocurreret ei, malis saepe euripidis ea mea, cu nec fierent temporibus. Pro at amet erant, sit ut vidisse saperet, eum etiam ponderum ne. Mazim atomorum mediocrem ei eos.', 'Network laboramus neglegentur ea eum', true);
INSERT INTO network ( id, board_members, description, name, status ) VALUES (3, 'Paulo Vieira', 'Pri ea principes expetendis repudiandae. Ut cum lorem novum delicata. Ius eu quis nostrum intellegam, dolore eirmod mel at, modo commune cu duo. Eu oratio saperet mel, facilis quaestio ius ex.','Network ea principes expetendis repudiandae', true);

-- Institution
INSERT INTO institution( id, name, address, city, country, district, phone_number, postal_code, description, discipline, governance, type, web_site )
 VALUES (1, 'INPA - Instituto Nacional de Pesquisas da Amazônia', 'Av. André Araujo', 'Manaus','Brazil', 'AM', '(92) 3643-3377', '69080-971', 'Curabitur vel eros eu ex mollis faucibus. Curabitur interdum libero neque, a semper sem tempus vel. Nam quam velit, condimentum sed lacinia et, varius ut turpis.', '', '', '','http://http://portal.inpa.gov.br/');
INSERT INTO institution( id, name, address, city, country, district, phone_number, postal_code, description, discipline, governance, type, web_site )
 VALUES (2, 'Jardim Botânico de São Paulo', 'Av. Miguel Estefano 3031', 'São Paulo', 'Brazil', 'SP', '55 (11) 5073-6300 ext 225', '3687', 'Curabitur vel eros eu ex mollis faucibus. Curabitur interdum libero neque, a semper sem tempus vel. Nam quam velit, condimentum sed lacinia et, varius ut turpis.', '', '', '','http://botanica.sp.gov.br/');
INSERT INTO institution( id, name, address, city, country, district, phone_number, postal_code, description, discipline, governance, type, web_site )
 VALUES (3, 'Jardim Botânico de Sorocaba', 'Rua Miguel Montoro Lozano, 340', 'Sorocaba', 'Brazil', 'SP', '55 (15) 3227-9996', '18025-000 ', 'Curabitur vel eros eu ex mollis faucibus. Curabitur interdum libero neque, a semper sem tempus vel. Nam quam velit, condimentum sed lacinia et, varius ut turpis.', '', '', '','http://meioambientesorocaba.com.br/Pagina.aspx?pg=67');
INSERT INTO institution( id, name, address, city, country, district, phone_number, postal_code, description, discipline, governance, type, web_site )
 VALUES (4, 'Jardim Botânico de Caxias do Sul', 'Rua Alfredo Chaves, 1333', 'Caxias do Sul', 'Brazil', 'RS', '55 (54) 3218-6000', '3687', 'Curabitur vel eros eu ex mollis faucibus. Curabitur interdum libero neque, a semper sem tempus vel. Nam quam velit, condimentum sed lacinia et, varius ut turpis.', '', '', '','https://www.caxias.rs.gov.br/meio_ambiente/texto.php?codigo=603');
INSERT INTO institution( id, name, address, city, country, district, phone_number, postal_code, description, discipline, governance, type, web_site )
 VALUES (5, 'Jardim Botânico de Porto Alegre', 'Rua Dr. Salvador França, 1427', 'Porto Alegre', 'Brazil', 'RS', '(51) 3320-2027', '90690-000', 'Curabitur vel eros eu ex mollis faucibus. Curabitur interdum libero neque, a semper sem tempus vel. Nam quam velit, condimentum sed lacinia et, varius ut turpis.', '', '', '','http://www.jb.fzb.rs.gov.br/');
INSERT INTO institution( id, name, address, city, country, district, phone_number, postal_code, description, discipline, governance, type, web_site )
 VALUES (6, 'Jardim Botânico de Recife', 'BR-232, Km 7,5 - Curado', 'Recife', 'Brazil', 'PE', '55 (81) 3355.0003', '1234567', 'Curabitur vel eros eu ex mollis faucibus. Curabitur interdum libero neque, a semper sem tempus vel. Nam quam velit, condimentum sed lacinia et, varius ut turpis.', '', '', '','http://www.recife.pe.gov.br/meioambiente/jb_apresentacao.php');
INSERT INTO institution( id, name, address, city, country, district, phone_number, postal_code, description, discipline, governance, type, web_site )
 VALUES (7, 'Jardim Botânico do Rio de Janeiro', 'Rua Jardim Botânico, 1008', 'Rio de Janeiro', 'Brazil', 'RJ', '55 (21) 3874-1808', '22470-180', 'Curabitur vel eros eu ex mollis faucibus. Curabitur interdum libero neque, a semper sem tempus vel. Nam quam velit, condimentum sed lacinia et, varius ut turpis.', '', '', '','http://www.jbrj.gov.br/');

-- Curator
INSERT INTO curator (id, name, institution_id) VALUES (1,'Richard Vogt', 1);
INSERT INTO curator (id, name, institution_id) VALUES (2,'Julia Andrade', 1);
INSERT INTO curator (id, name, institution_id) VALUES (3,'João Silva', 1);
INSERT INTO curator (id, name, institution_id) VALUES (4,'Maria Souza', 1);
INSERT INTO curator (id, name, institution_id) VALUES (5,'Rogério Henriques', 2);
INSERT INTO curator (id, name, institution_id) VALUES (6,'Cássio da Silva', 2);
INSERT INTO curator (id, name, institution_id) VALUES (7,'Augusto Couto', 2);
INSERT INTO curator (id, name, institution_id) VALUES (8,'Wladimir Pereira', 3);
INSERT INTO curator (id, name, institution_id) VALUES (9,'Débora Barbosa', 3);
INSERT INTO curator (id, name, institution_id) VALUES (10,'Gabriela Antunes', 3);

-- Collections
INSERT INTO biodiversity_collection(id, description, name, preservation_methods, type, web_site, curator_id, institution_id ) VALUES
(1, 'A Colecao de Anfibios e Repteis foi implementada em 1985 e conta atualmente com mais de 33.000 especimes tombados. Cerca de 80% sao representados por anfibios e 20% por repteis. A maior parte do material e conservada em via liquida (alcool 70%) e abriga tambem material em via seca como carapaca de quelonios e peles de jacares, acondicionados em armarios com naftalina. A colecao possui 10 exemplares typus, sendo 3 holotipos e 7 parotipos.',
 'Colecao de Anfibios e Repteis', '', 'SUB', '', 1, 1);
INSERT INTO biodiversity_collection (id, description, name, preservation_methods, type, web_site, curator_id, institution_id ) VALUES
(2, 'Lorem ipsum dolor sit amet, ipsum assum propriae at quo, eam ea nonumy persius. Te quo meis malis paulo, et ipsum suscipit nam. Ad purto blandit vel, et nullam argumentum eam, no mazim persius dolorem ius. Sea id atomorum argumentum repudiandae, ut vix facer iusto inciderint, pro an putant verterem. Duo ad illud errem, iusto nostro adipisci eam in, mea movet solet ne.',
 'No his natum iisque deseruisse', '', 'SUB', '', 1, 2);
INSERT INTO biodiversity_collection (id, description, name, preservation_methods, type, web_site, curator_id, institution_id ) VALUES
(3, 'Ea dolor recteque mel, per ex mutat molestie reformidans. Lucilius adversarium ex sea, eum ex suas dicat rationibus, eos blandit facilisi menandri ei. Novum laoreet petentium ne est. Homero saperet blandit nec ut, te usu utamur constituam suscipiantur.',
 'Facer velit ea sed, pri iudico utinam eu', '', 'SUB', '', 1, 3);
INSERT INTO biodiversity_collection (id, description, name, preservation_methods, type, web_site, curator_id, institution_id ) VALUES
(4, 'Ne quo omnes lucilius definitionem, cu labitur urbanitas sententiae nec, id per omnes utroque. Cu harum albucius qui, choro neglegentur nec eu. Vix ei iuvaret vivendum omittantur, facete pertinacia usu in. At albucius molestie quaerendum ius, no pro graece urbanitas, ludus comprehensam ei eam.',
 'Ei quo putent graecis percipit, ad vis inani impetus', '', 'SUB', '', 1, 3);
INSERT INTO biodiversity_collection (id, description, name, preservation_methods, type, web_site, curator_id, institution_id ) VALUES
(5, 'Delicata senserit per cu, id vel nisl apeirian complectitur. Ut epicurei scripserit mea, pri wisi delicatissimi cu. Ocurreret argumentum eu ius, te sea scripta nominati. Nec congue nominavi intellegebat ea. At vix consetetur vituperata signiferumque.',
 'Mel integre deseruisse ad.', '', 'SUB', '', 1, 5);

-- Samples
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Lorem ipsum dolor sit amet', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Euismod laboramus neglegentur ea eum', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Pri ea principes expetendis repudiandae', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('An hinc legendos sed, qui ne omnes dicant aperiam', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Iusto tempor ea usu, at vis movet altera gloriatur', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('An dicunt euismod sed, vim minim sanctus mediocrem ne', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Reque invidunt consetetur id duo, case fuisset corrumpit qui ad', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Mel integre deseruisse ad', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Quo id aeque suscipit scripserit', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Delicata senserit per cu, id vel nisl apeirian complectitur', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('At vix consetetur vituperata signiferumque', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Prompta adipisci vim ad, at feugait phaedrum vis', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Mea in semper aperiri adipisci', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Qui facer suavitate euripidis in, libris eirmod qui et', null, 1, 1, 1, null);
INSERT INTO sample (name, status, collection_id, curator_id, institution_id, taxonomy_id) VALUES('Odio numquam pri at, aeque iriure mea ad', null, 1, 1, 1, null);

-- Network_Biodiversity_Collection
INSERT INTO network_biodiversity_collection (network_id, collection_id) VALUES (1, 1);
INSERT INTO network_biodiversity_collection (network_id, collection_id) VALUES (2, 1);
INSERT INTO network_biodiversity_collection (network_id, collection_id) VALUES (3, 1);

-- Documents
INSERT INTO document (id, author, content_type, description, name, status, title, type, sample_id, collection_id)
  VALUES(1, 'Eduardo Álvares', 'pdf', 'No elitr tacimates vim. Eius summo et ius, mel ad cibo aliquip, cu quaestio qualisque iracundia sea. Ad augue saepe vivendo eum, ei vim periculis efficiantur.', 'Ut cum nobis dolor', false, 'Ut cum nobis dolor', 'PUBLICATION', 1, 1);
INSERT INTO document (id, author, content_type, description, name, status, title, type, sample_id, collection_id)
  VALUES(2, 'Julia Boaventura', 'doc', 'At fugit vivendo signiferumque pri, ne saepe viderer pri. No tollit nostrum lobortis vel, ut primis aliquam prodesset vis. Quo nisl dolore intellegebat ex, honestatis persequeris ne vix, no cum duis dolore', 'Lorem ipsum dolor sit amet, vix ne laudem constituto disputation', false, 'Lorem ipsum dolor sit amet, vix ne laudem constituto disputation', 'PUBLICATION', 1, 1);
INSERT INTO document (id, author, content_type, description, name, status, title, type, sample_id, collection_id)
  VALUES(3, 'Julia Medeiros', 'text', 'Ad sea error feugait appellantur, ut error tamquam constituam eos, te discere euismod complectitur ius. Usu in putant option maluisset, liber voluptua signiferumque ei nec, sumo deserunt eum te. Qui ea amet laudem', 'Ea porro invidunt moderatius per', false, 'Ea porro invidunt moderatius per', 'OTHER', 1, 1);
INSERT INTO document (id, author, content_type, description, name, status, title, type, sample_id, collection_id)
  VALUES(4, 'Leila Caetano', 'pdf', 'No elitr tacimates vim. Eius summo et ius, mel ad cibo aliquip, cu quaestio qualisque iracundia sea. Ad augue saepe vivendo eum, ei vim periculis efficiantur.', 'Ut cum nobis dolor', false, 'Ut cum nobis dolor', 'PUBLICATION', 1, 1);
INSERT INTO document (id, author, content_type, description, name, status, title, type, sample_id, collection_id)
  VALUES(5, 'José Bastos', 'csv', 'Id ius ancillae conceptam scripserit, in quo utamur fabellas indoctum, vis ut corpora democritum omittantur. Et ignota populo mei. Ut sale euripidis vix, quo verear ceteros electram ut. Natum appareat vel ea, eam at legere assueverit appellantur. Id rebum inimicus qui.', 'Et eum vidit eripuit convenir', false, 'Et eum vidit eripuit convenir', 'LEGAL', 1, 1);

