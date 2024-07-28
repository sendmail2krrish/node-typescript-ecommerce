import { DataSource } from "typeorm";
import Product from "./entities/Product";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: "mongodb://127.0.0.1:27017/ecommerce",
  synchronize: true,
  useUnifiedTopology: true,
  entities: [Product],
});
