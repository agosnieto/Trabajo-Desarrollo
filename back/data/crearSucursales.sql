CREATE TABLE IF NOT EXISTS Sucursales (
  id_sucursal INTEGER ,
  zona_sucursal VARCHAR(30),
  PRIMARY KEY (id_sucursal)
);

INSERT INTO Sucursales (id_sucursal,zona_sucursal)
VALUES
  (1,'Zona Sur'),
  (2,'Zona Norte'),
  (3,'Zona Este'),
  (4,'Zona Oeste')
  ;
