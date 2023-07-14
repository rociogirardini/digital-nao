import express from "express";
import cors from "cors";
import { dbConnection } from "../db/config.js";
import router from "../routes/restaurants.routes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.tattlerPath = "/api/restaurants"

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {
   this.app.use(this.tattlerPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

export default Server;
