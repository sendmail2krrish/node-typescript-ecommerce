import "reflect-metadata";
import { Server } from "typhoonts";
import ProductController from "./controllers/ProductController";
import { AppDataSource } from "./data-source";

const server = new Server({
  useBodyParser: true,
  useCookieParser: true,
  useSession: true,
  sessionOptions: { secret: "my_secret_key" },
});

server.registerController(ProductController);

server.listen(8000, () => {
  console.log("server is running on http://localhost:8000");

  AppDataSource.initialize()
    .then(async () => {
      console.log("DB initialize");
    })
    .catch((error) =>
      console.log("Error during Data Source initialization:", error)
    );
});
