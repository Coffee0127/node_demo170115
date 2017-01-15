const routes = require('./routes');

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    // routes.indexRoute(req, res);
    // routes.userRoute(req, res);
    routes.route(req, res);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});