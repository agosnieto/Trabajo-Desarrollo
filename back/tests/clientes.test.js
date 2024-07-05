const supertest = require('supertest');
const app = require('../app.js');

describe("GET /api/clientes", () => {
  it("Devolver todos los registros de la tabla clientes", async () => {
    const res = await supertest(app).get("/api/clientes");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Cuil: expect.any(Number),
          Nombre: expect.any(String),
          id_tipo_cliente: expect.any(Number),
          Fecha_nacimiento: expect.any(String)
        }),
      ])
    );
  });
});

describe("GET /api/clientes/:cuil", () => {
  it("Devolver el cliente con el cuil 20058549653", async () => {
    const res = await supertest(app).get("/api/clientes/20058549653");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Cuil: expect.any(Number),
        Nombre: expect.any(String),
        id_tipo_cliente: expect.any(Number),
        Fecha_nacimiento: expect.any(String)
      })
    );
  });

  it("Devolver status 404 si el cliente no existe", async () => {
    const res = await supertest(app).get("/api/clientes/1");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
});

const cliente = {
  cuil: 20222223562,
  nombre: "Marcelo Lopez",
  id_tipo_cliente: 4,
  fecha_nacimiento: "1995-02-09"
};

describe("POST /api/clientes/", () => {
  it("Crear el cliente con el cuil 20222223562", async () => {
    const res = await supertest(app)
      .post("/api/clientes")
      .send(cliente);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        Cuil: expect.any(Number),
        Nombre: expect.any(String),
        id_tipo_cliente: expect.any(Number),
        Fecha_nacimiento: expect.any(String)
      })
    );
  });
});

const modificar = {
  nombre: "Marcelo Lopez",
  id_tipo_cliente: 2,
  fecha_nac: "2000-05-05"
};

describe("PUT /api/clientes/:cuil", () => {
  it("Modificar el cliente con el cuil 20058549653", async () => {
    const res = await supertest(app)
      .put("/api/clientes/20058549653")
      .send(modificar);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Cuil: expect.any(Number),
        Nombre: expect.any(String),
        id_tipo_cliente: expect.any(Number),
        Fecha_nacimiento: expect.any(String)
      })
    );
  });

  it("Devolver status 404 si el cliente a modificar no existe", async () => {
    const res = await supertest(app)
      .put("/api/clientes/1")
      .send(modificar);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
});

describe("DELETE /api/clientes/:cuil", () => {
  it("Devuelve el cliente eliminado con el cuil 20222223562", async () => {
    const res = await supertest(app).delete("/api/clientes/20222223562");
    expect(res.statusCode).toEqual(202);
    expect(res.body).toEqual(
      expect.objectContaining({
        Cuil: expect.any(Number),
        Nombre: expect.any(String),
        id_tipo_cliente: expect.any(Number),
        Fecha_nacimiento: expect.any(String)
      })
    );
  });

  it("Devolver status 404 si el cliente a eliminar no existe", async () => {
    const res = await supertest(app).delete("/api/clientes/1");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
});