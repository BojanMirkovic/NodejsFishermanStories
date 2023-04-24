const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} received.`);

  // Set MIME type for css files
  if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  }

  // Set MIME type for javascript files
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'text/javascript');
  }

  // Serve index.html file
  if (req.url === '/') {
    fs.readFile('./public/index.html', (err, data) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    });
    return;
  }

  // Serve other static files
  const filePath = path.join(__dirname, 'public', req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 404;
      res.end('File not found');
      return;
    }

    const mimeType = mime.getType(filePath);
    res.setHeader('Content-Type', mimeType);
    res.end(data);
  });
});

server.listen(5050, () => {
  console.log('Server listening on port ');
});

