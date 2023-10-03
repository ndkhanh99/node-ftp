const http = require('http');
var Client = require('ftp');
const ftp = require('./FTPClient');
var ftpClient = require('ftp-client')
 
const hostname = '127.0.0.1';
const port = 9000;
 
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    // const client = new ftp('ftp.rakuten.ne.jp', 16910, '_partner_53016', '5AXzwF/y', false);
    // client.getList();
    
    let config = {
        host: 'localhost',
        port: 21,
        user: 'anonymous',
        password: 'anonymous@'
    }
    let options = {
        logging: 'basic'
    }
    let client = new ftpClient(config, options);
    client.connect(function () {
        client.list();
    });

    res.end('ok');
});
 
server.listen(port);