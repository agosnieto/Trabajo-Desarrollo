CREATE TABLE IF NOT EXISTS Barrios (
  id_barrio INTEGER ,
  nombre_barrio VARCHAR(30),
  PRIMARY KEY (id_barrio)
);

INSERT INTO Barrios (id_barrio , nombre_barrio)
VALUES
  (1,'Residencial America'),
  (2,'Los Gigantes'),
  (3,'Centro America'),
  (4,'Villa Azalais Oeste'),
  (5,'Ayacucho'),
  (6,'General Paz')
  ;
