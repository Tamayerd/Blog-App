import express, { Application } from "express";
import Database from "./config/database";
import cors from "cors"; 
import dotenv from "dotenv";
import Routes from "./router/MainRoutes";



dotenv.config();

class App {
  public app: Application;
  private database: Database;

  constructor() {
    this.app = express();
    this.database = new Database();
    this.plugins();

    this.initializeDatabase().then(() => {
      this.routes();
    });
  }

  protected plugins(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async initializeDatabase() {
    await this.database.initialize();
  }

  protected routes(): void {
   Routes.initialize(this.app);
  }
}

const port: number = Number(process.env.PORT) || 8000;
const app = new App().app;

app.listen(port, () => {
  console.log("Server started successfully");
});
