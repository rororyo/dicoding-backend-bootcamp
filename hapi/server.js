import Hapi from '@hapi/hapi'
import routes from './routes.js';
const init = async ()=>{
    const server = Hapi.server({
       port: 3000,
       host:'localhost', 
    });

    server.route(routes)
    await server.start();
    console.log ("Server berjalan di port 3000")
}

init();
