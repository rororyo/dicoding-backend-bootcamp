import Hapi from "@hapi/hapi";
import routes from "./routes.js";

const init = async () => {
  const server = Hapi.Server({
    port: 5000,
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
