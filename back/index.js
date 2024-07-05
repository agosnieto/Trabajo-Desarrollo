const app = require("./app.js");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

async function start() {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
  });
}

start();
