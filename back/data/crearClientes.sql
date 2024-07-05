CREATE TABLE IF NOT EXISTS Clientes (
  cuil_cliente INTEGER,
  nombre_cliente VARCHAR(20),
  barrio VARCHAR(10),
  fecha_nacimiento DATE,
  PRIMARY KEY (cuil_cliente)
);

INSERT INTO Clientes (cuil_cliente, nombre_cliente, barrio, fecha_nacimiento)
VALUES
  (20058549653, 'Martin Diaz', 'Alto Verde', '1990-05-15'),
  (20446548227, 'Jose Gonzalez', 'General Paz', '2001-09-25'),
  (21456987254, 'Joaquin Martínez', 'Barrio Jardin', '2004-05-30'),
  (22356582159, 'Jennifer Aguirre', 'Pueyrredon', '1995-07-09'),
  (20215468261, 'Maria Esperanza Cuenca', 'Matienzo', '1975-11-14'),
  (20335462568, 'Alfonso Cantos', 'Estacion Flores', '1985-12-10'),
  (20435768527, 'Mariano Romero', 'Residencial Velez Sardsfield', '2002-02-18'),
  (21123545762, 'Eusebio Tome', 'General Paz', '1958-04-24'),
  (20405768216, 'Melania Amaya', 'Matienzo', '2000-06-08'),
  (20385462195, 'Alejandro Mateos', 'General Paz', '1990-10-04')
  ;
