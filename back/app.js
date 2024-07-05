const express = require("express");
const indexRouter = require("./routers/index.router.js");
const cors = require('cors');
const app = new express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a la API TP Integrador, Debe ingresar: /api",
  });
});

app.use("/api", indexRouter);

module.exports = app;
