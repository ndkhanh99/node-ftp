const http = require('http');
var Client = require('ftp');
const ftp = require('./FTPClient');
var ftpClient = require('ftp-client');
var os = require('os');

if (os.platform() == 'win32') {  
  if (os.arch() == 'ia32') {
      var chilkat = require('@chilkat/ck-node17-win-ia32');
  } else {
      var chilkat = require('@chilkat/ck-node17-win64'); 
  }
} else if (os.platform() == 'linux') {
  if (os.arch() == 'arm') {
      var chilkat = require('@chilkat/ck-node18-arm');
  } else if (os.arch() == 'x86') {
      var chilkat = require('@chilkat/ck-node18-linux32');
  } else {
      var chilkat = require('@chilkat/ck-node18-linux64');
  }
} else if (os.platform() == 'darwin') {
  var chilkat = require('@chilkat/ck-node18-macosx');
}

const connectionProperties = {
    host: 'ftp.rakuten.ne.jp',
    user: '_partner_53016',
    password: '5AXzwF/y',
    port: '16910',
    secure: false
}
 
const port = 9000;
 
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    const client = new ftp('ftp.rakuten.ne.jp', 16910, '_partner_53016', '5AXzwF/y', false);
    // client.getList();
    // getFilesFromFTP();
    chilkatExample();
    res.end('ok');
});

async function getFilesFromFTP () {
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
    await c.connect(connectionProperties);
    c.Passive = true;
    console.log(c);
}

function chilkatExample() {

  // This example assumes Chilkat Ftp2 to have been previously unlocked.
  // See Unlock Ftp2 for sample code.

  var ftp = new chilkat.Ftp2();

  ftp.Hostname = "ftp.rakuten.ne.jp";
  ftp.Port = 16910;
  ftp.Username = "_partner_53016";
  ftp.Password = "5AXzwF/y";

  // Connect to the FTP server.
  var success = ftp.ConnectOnly();
  if (success !== true) {
      console.log(ftp.LastErrorText);
      return;
  }

  ftp.Passive = true;

  // Authenticate with the FTP server.
  success = ftp.LoginAfterConnectOnly();
  if (success !== true) {
      console.log(ftp.LastErrorText);
      return;
  }

  // Retrieve (in XML format) the HOME directory of this FTP account.
  var xmlListing = ftp.GetXmlDirListing("*.*");
  if (ftp.LastMethodSuccess !== true) {
      console.log(ftp.LastErrorText);
      return;
  }

  // Now load the XML and parse it..
  var xml = new chilkat.Xml();
  xml.LoadXml(xmlListing);
  console.log(xml.GetXml());

  // Iterate over the XML...
  var i = 0;
  var numEntries = xml.NumChildren;
  while (i < numEntries) {
      // xEntry: Xml
      var xEntry = xml.GetChild(i);
      if (xEntry.TagEquals("dir") == true) {
          console.log("Directory: " + xEntry.Content);
      }
      else {
          var sz = xEntry.GetChildIntValue("size");
          console.log("File: " + xEntry.GetChildContent("name") + ", size: " + sz);
          // xLastMod: Xml
          var xLastMod = xEntry.FindChild("lastModTime");
          if (xEntry.LastMethodSuccess == true) {
              var month = xLastMod.GetAttrValueInt("m");
              var year = xLastMod.GetAttrValueInt("y");
              var day = xLastMod.GetAttrValueInt("d");
              console.log("    YYYY-MM-DD: " + year + "-" + month + "-" + day);
          }
      }

      i = i+1;
  }
  ftp.Disconnect();

  console.log("Success.");
}
 
server.listen(port);