import Hapi from "@hapi/hapi";
import routes from "./routes.js";
import env from 'dotenv'
env.config()
const init = async () => {
  const server = Hapi.Server({
    port: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
        credentials: true
      }
    }
  });

  server.route(routes);

  await server.start();
  console.log("Server berjalan di port 5000");
};

init();
