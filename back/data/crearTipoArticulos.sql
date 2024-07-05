CREATE TABLE IF NOT EXISTS TipoArticuloS (
  id_tipo_articulo INTEGER,
  nombre_tipo_articulo VARCHAR(40),
  PRIMARY KEY(id_tipo_articulo )
);

INSERT INTO TipoArticulo (id_tipo_articulo, nombre_tipo_articulo)
VALUES
  (1,'Computadoras'),
  (2,'Notebooks'),
  (3,'Monitores'),
  (4,'Impresion'),
  (5,'Accesorios'),
  (6,'Celulares')
  ;
