const supertest = require('supertest')
const app = require('../app.js')

describe("GET /api/barrios", () => {
  it("Devolver todos los registros de la tabla barrios", async () => {
    const res = await supertest.agent(app).get("/api/barrios");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id_barrio: expect.any(Number),
          nombre_barrio: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /api/barrios/:id_barrio", () => {
  it("Devolver el barrio con el ID 9", async () => {
      const res = await supertest.agent(app).get("/api/barrios/9");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
          expect.objectContaining({
              id_barrio: expect.any(Number),
              nombre_barrio: expect.any(String)
          })
      );
  });
});

describe("GET /api/barrios/:id_barrio", () => {
  it("Devolver status 404, el barrio con el ID 16 no existe", async () => {
      const res = await supertest.agent(app).get("/api/barrios/16");
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.any(String)
          })
      );
  });
});

const modificar = {
    nombre_barrio: "Bolivar"
}

describe("PUT /api/barrios/:id_barrio", () => {
  it("Modificar el barrio con el id 8", async () => {
      const res = await supertest.agent(app).put("/api/barrios/8").send(modificar);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(
          expect.objectContaining({
            id_barrio: expect.any(Number),
            nombre_barrio: expect.any(String),
          })
      );
  });
});

describe("PUT /api/barrios/:id_barrio", () => {
  it("Devuelve status 404 al querer modificar el barrio con el ID 200 que no existe", async () => {
      const res = await supertest.agent(app).put("/api/barrios/200").send(modificar);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual(
          expect.objectContaining({
            error: expect.any(String)
          })
      );
  });
});

