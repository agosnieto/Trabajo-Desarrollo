const supertest = require("supertest");
const app = require("../app.js");

describe("GET /api/articulos", () => {
  it("Devolver todos los registros de la tabla articulos", async () => {
    const res = await supertest(app).get("/api/articulos");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true); // Verifica que res.body sea un array
    res.body.forEach((articulo) => {
      expect(articulo).toEqual(
        expect.objectContaining({
          id_articulo: expect.any(Number),
          nombre_articulo: expect.any(String),
          fecha_compra: expect.any(String),
          id_tipo_articulo: expect.any(Number),
        })
      );
    });
  });
});

describe("GET /api/articulos/:id_articulos", () => {
  it("Devolver el articulo con el id 2", async () => {
    const res = await supertest(app).get("/api/articulos/2");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_articulo: expect.any(Number),
        nombre_articulo: expect.any(String),
        fecha_compra: expect.any(String),
        id_tipo_articulo: expect.any(Number),
      })
    );
  });

  it("Devolver status 404 si el articulo no existe", async () => {
    const res = await supertest(app).get("/api/articulos/130");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });
});

describe("POST /api/articulos", () => {
  it("Crear un nuevo articulo", async () => {
    const articulo = {
      id_articulo: 22,
      nombre_articulo: "Monitor Galaxy",
      fecha_compra: "2022-05-25",
      id_tipo_articulo: 3,
    };
    const res = await supertest(app)
      .post("/api/articulos")
      .send(articulo);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_articulo: expect.any(Number),
        nombre_articulo: expect.any(String),
        fecha_compra: expect.any(String),
        id_tipo_articulo: expect.any(Number),
      })
    );
  });
});

describe("PUT /api/articulos/:id_articulos", () => {
  it("Modificar el articulo con el id 22", async () => {
    const modificar = {
      nombre_articulo: "Tablet Sony",
      fecha_compra: "2024-06-07",
      id_tipo_articulo: 7,
    };
    const res = await supertest(app)
      .put("/api/articulos/22")
      .send(modificar);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_articulo: expect.any(Number),
        nombre_articulo: expect.any(String),
        fecha_compra: expect.any(String),
        id_tipo_articulo: expect.any(Number),
      })
    );
  });

  it("Devolver status 404 si el articulo a modificar no existe", async () => {
    const modificar = {
      nombre_articulo: "Tablet Samsung",
      fecha_compra: "2010-10-26",
      id_tipo_articulo: 8,
    };
    const res = await supertest(app)
      .put("/api/articulos/2009")
      .send(modificar);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });
});

describe("DELETE /api/articulos/:id_articulo", () => {
  it("Devuelve el articulo eliminado con el id 22", async () => {
    const res = await supertest(app).delete("/api/articulos/22");
    expect(res.statusCode).toEqual(202);
    expect(res.body).toEqual(
      expect.objectContaining({
        id_articulo: expect.any(Number),
        nombre_articulo: expect.any(String),
        fecha_compra: expect.any(String),
        id_tipo_articulo: expect.any(Number),
      })
    );
  });

  it("Devolver status 404 si el articulo a eliminar no existe", async () => {
    const res = await supertest(app).delete("/api/articulos/2006");
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: "Articulo no encontrado",
      })
    );
  });
});
