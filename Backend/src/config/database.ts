import { DataSource } from "typeorm";

import { User } from "../model/UserModel";
import { Group } from "../model/Group";
import { GroupMember } from "../model/GroupMember";

import dotenv from "dotenv";
import { Blog } from "../model/Blog";
import { Comment } from "../model/Comment";
import { Like } from "../model/Like";


dotenv.config();

class Database {
  public appDataSource: DataSource;

  private DB_DATABASE = process.env.DB_DATABASE;
  private DB_HOST = process.env.DB_HOST;
  private DB_PORT = process.env.DB_PORT;
  private DB_USERNAME = process.env.DB_USERNAME;
  private DB_PASSWORD = process.env.DB_PASSWORD;

  constructor() {
    this.appDataSource = new DataSource({
      type: "postgres",
      host: this.DB_HOST,
      port: Number(this.DB_PORT),
      username: this.DB_USERNAME,
      password: this.DB_PASSWORD,
      database: this.DB_DATABASE,
      synchronize: true,
      logging: false,
      entities: [User, Group, GroupMember, Blog,Comment,Like],
    });
  }

  public async initialize() {
    try {
      await this.appDataSource.initialize();
      console.log("PostgreSQL connection has been established successfully.");
    } catch (err) {
      console.log("Unable to connect to the PostgreSQL database.", err);
    }
  }
}

export default Database;
