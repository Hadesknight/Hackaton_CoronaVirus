import "dotenv/config";
import express from "express";
import cors from "cors";

import routes from "./routes";

class App {
  constructor() {
    this.server = express();
  }

  Middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  router() {
    this.server.use(routes);
  }
}

export default new App().server;
