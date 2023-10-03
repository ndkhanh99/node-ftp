const http = require('http');
var Client = require('ftp');
const ftp = require('./FTPClient');
var ftpClient = require('ftp-client');

const connectionProperties = {
    host: 'ftp.rakuten.ne.jp',
    user: '_partner_53016',
    password: '5AXzwF/y',
    port: '16910'
}
 
const port = 9000;
 
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    // const client = new ftp('ftp.rakuten.ne.jp', 16910, '_partner_53016', '5AXzwF/y', false);
    // client.getList();
    getFilesFromFTP();
    res.end('ok');
});

const getFilesFromFTP = () => {
    console.log('connecting');
    var c = new Client();
    c.on('ready', function() {
      c.list(function(err, list) {
        if (err) throw err;
        console.log(list);
        c.end();
      });
    });
    // connect to localhost:21 as anonymous
    c.connect(connectionProperties);
}
 
server.listen(port);