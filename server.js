const { createServer } = require('node:http');
const fs = require('fs');
const path = require('path');

const hostname = '0.0.0.0';
const port = 3000;

const server = createServer((req, res) => {
  let filePath;

  // Route requests to appropriate files
  if (req.url === '/' || req.url === '') {
    filePath = path.join(__dirname, 'template.html');
  } else if (req.url === '/styles.css') {
    filePath = path.join(__dirname, 'styles.css');
  } else if (req.url === '/index.js') {
    filePath = path.join(__dirname, 'index.js');
  } else {
    res.statusCode = 404;
    res.end('Not Found');
    return;
  }

  // Read and serve the file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Server Error');
      return;
    }

    // Set appropriate content type
    let contentType = 'text/html';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    if (filePath.endsWith('.js')) contentType = 'application/javascript';

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});