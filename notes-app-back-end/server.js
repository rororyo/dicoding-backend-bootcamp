import Hapi from "@hapi/hapi";
import routes from "./routes.js";
import env from 'dotenv'
env.config()
const init = async () => {
  const server = Hapi.server({    
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
        cors: {
            origin: ['*'],
        },
    },
});

  server.route(routes);

  await server.start();
  console.log("Server berjalan di port 5000");
};

init();
