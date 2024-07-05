CREATE TABLE IF NOT EXISTS Ventas (
  Nro_venta INTEGER,
  Cliente_cuil INTEGER NOT NULL,
  Vendedor_leg INTEGER NOT NULL,
  Articulo_id INTEGER NOT NULL,
  Fecha_venta DATE,
  Nom_sucursal VARCHAR(10),
  Id_tipo_venta INTEGER,
  PRIMARY KEY(Nro_venta AUTOINCREMENT)
);

INSERT INTO Ventas (Nro_venta, Cliente_cuil, Vendedor_leg, Articulo_id, Fecha_venta, Nom_sucursal)
VALUES
  (24, 20058549653, 36784, 1, '2023-04-29', 'Sucursal A'),
  (25, 20446548227, 34546, 2, '2023-05-02', 'Sucursal B'),
  (26, 20123659874, 37784, 22, '2023-05-05', 'Sucursal C'),
  (27, 20369854123, 36776, 7, '2023-05-08', 'Sucursal R'),
  (28, 20587412589, 22384, 57, '2023-05-11', 'Sucursal D'),
  (29, 20145879632, 98744, 16, '2023-05-14', 'Sucursal C'),
  (30, 20632548741, 45644, 9, '2023-05-17', 'Sucursal R'),
  (31, 20158741256, 34541, 94, '2023-05-20', 'Sucursal B'),
  (32, 20632547856, 43214, 9, '2023-05-23', 'Sucursal N'),

/* DESPUES AGREGAR LOS TIPOS DE VENTA Y CLAVES FORANEAS */