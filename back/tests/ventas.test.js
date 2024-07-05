const request = require("supertest");
const app = require("../app.js");
const e = require("express");
const { DATE } = require("sequelize");
const { format } = require("sequelize/lib/utils");

describe("GET /api/ventas", () => {
  it("Devolver todos los registros de la tabla ventas", async () => {
    const res = await request(app).get("/api/ventas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Nro_venta: expect.any(Number),
          Cliente_cuil: expect.any(Number),
          Vendedor_leg: expect.any(Number),
          Articulo_id: expect.any(Number),
          Fecha_venta: expect.any(String),  // Cambiado a String
          id_sucursal: expect.any(Number)
        }),
      ])
    );
  });
});

//este test dejara de funcionar si la venta nro 24 se modifica
describe("GET /api/ventas:nroVenta", () => {
  it("Devolver la venta numero 28", async () => {
    const res = await request(app).get("/api/ventas/28");
    expect(res.statusCode).toEqual(200);
    expect(res.body.Nro_venta).toEqual(28);
    expect(res.body.Cliente_cuil).toEqual(20215468261);
    expect(res.body.Vendedor_leg).toEqual(30006);
    expect(res.body.Articulo_id).toEqual(4);
    expect(res.body.Fecha_venta).toEqual("2023-08-11");
    expect(res.body.id_sucursal).toEqual(9);
  });
});

describe("GET /api/ventas:nroVenta", () => {
  it("Devolver 404, ya que no se encontro la venta", async () => {
    const res = await request(app).get("/api/ventas/1005");
    expect(res.statusCode).toEqual(404);
    expect(res.body.nro_venta).toEqual("1005");
    expect(res.body.encontrado).toBeNull;
    expect(res.body.message).toEqual("Venta no encontrada");
  });
});

const ventaPOST = {
  nro_venta: 50,
  cliente_cuil: 20215468261,
  vendedor_leg: 30009,
  articulo_id: 3,
  fecha_venta: "2024-03-02",
  id_sucursal: 5,
};

describe("POST /api/ventas", () => {
  it("Crear una nueva venta, con un Nro_venta autoincremental", async () => {
    const res = await request(app).post("/api/ventas/").send(ventaPOST);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nro_Venta: expect.any(Number),
        Cliente_Cuil: expect.any(Number),
        Vendedor_Leg: expect.any(Number),
        Articulo_Id: expect.any(Number),
        Fecha_Venta: expect.any(String),
        id_sucursal: expect.any(Number),
      })
    );
  });
});

const ventaPUT = {
  cliente_cuil: 20215468261,
  vendedor_leg: 30010,
  articulo_id: 2,
  fecha_venta: "2024-03-01",
  id_sucursal: 2,
};

describe("PUT /api/ventas:nroVenta", () => {
  it("Actualizar la venta numero 50", async () => {
    const res = await request(app).put("/api/ventas/50").send(ventaPUT);
    expect(res.statusCode).toEqual(200);
    expect(res.body.Cliente_Cuil).toEqual(20215468261);
    expect(res.body.Vendedor_Leg).toEqual(30010);
    expect(res.body.Articulo_Id).toEqual(2);
    expect(res.body.Fecha_Venta).toEqual("2024-03-01");
    expect(res.body.id_sucursal).toEqual(2);
  });
});

describe("PUT /api/ventas:nroVenta", () => {
  it("Devolver 404, ya que no se encontro la venta", async () => {
    const res = await request(app).put("/api/ventas/21");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Venta no encontrada");
  });
});

describe("DELETE /api/ventas:nroVenta", () => {
  it("Borrar la venta numero 50", async () => {
    const res = await request(app).delete("/api/ventas/50");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        Nro_venta: expect.any(Number),
        Cliente_cuil: expect.any(Number),
        Vendedor_leg: expect.any(Number),
        Articulo_id: expect.any(Number),
        Fecha_venta: expect.any(String),
        id_sucursal: expect.any(Number),
      })
    );
  });
});

describe("DELETE /api/ventas:nroVenta", () => {
  it("Devolver 404, ya que no se encontro la venta", async () => {
    const res = await request(app).delete("/api/ventas/21");
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual("Venta no encontrada");
  });
});
