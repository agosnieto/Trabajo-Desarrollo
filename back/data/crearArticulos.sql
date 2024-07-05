CREATE TABLE IF NOT EXISTS Articulos (
  id_articulo INTEGER ,
  nombre_articulo VARCHAR(30),
  fecha_compra DATE,
  PRIMARY KEY (id_articulo AUTOINCREMENT)
);

INSERT INTO Articulos (nombre_articulo,fecha_compra)
VALUES
  ('Pañales',  '2024-07-15'),
  ( 'Galletas',  '2001-10-25'),
  ( 'Cigarrillos', '2004-11-30'),
  ( 'Libreta',  '2003-06-02'),
  ( 'Reloj',  '2013-11-14'),
  ( 'Lapiz',  '2015-10-10'),
  ( 'Jarron',  '2022-03-18'),
  ( 'Almohada',  '2021-04-24'),
  ( 'Bandera', '2023-06-08'),
  ( 'Pack hojas',  '2022-07-04')
  ;
