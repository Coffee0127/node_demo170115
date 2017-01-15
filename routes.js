var fs = require('fs');

function route(req, res) {
    if (req.method == 'GET') {
        let fileName = '';
        res.statusCode = 200;
        res.setHeader('Content-TYpe', 'text/html');
        switch (req.url) {
            case '/':
                fileName = 'index.html';
                break;
            case '/user':
                fileName = 'user.html';
                break;
            default:
                fileName = '404.html';
                break;
        }
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end();
        });
    }
}

function indexRoute(req, res) {
    if (req.url == '/' && req.method == `GET`) {
        res.statusCode = 200;
        res.setHeader('Content-TYpe', 'text/html');
        // res.write('index.html');    // write anything you want
        fs.readFile('index.html', (err, data) => {
            if (err) throw err;
            res.write(data);
            res.end('index.html');
        });
        // fs.createReadStream('./index.html').pipe(res);
    }
}

function userRoute(req, res) {
    if (req.url == '/user') {
        res.statusCode = 200;
        res.end('Hello User');
    }
}

module.exports.route = route;
module.exports.indexRoute = indexRoute;
module.exports.userRoute = userRoute;