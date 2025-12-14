const { createServer } = require('node:http');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const querystring = require('querystring');

const hostname = '0.0.0.0';
const port = 3000;

const pool = new Pool({
  user: 'jack',
  password: 'mytestdb1',
  host: '192.168.50.117', // Your VM's IP where PostgreSQL is running
  port: 5432, // Default PostgreSQL port
  database: 'form_data'
});

const server = createServer(async (req, res) => {
  let filePath;

  // Handle POST requests from form submission
  if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = querystring.parse(body);
        
        // Insert into PostgreSQL
        await pool.query(
          'INSERT INTO platform_users (email, country, postal_code, password) VALUES ($1, $2, $3, $4)',
          [data.email, data.country, data['postal-code'], data.password]
        );

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Database error' }));
      }
    });
    return;
  }

  // Handle GET requests for static files (existing code)
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

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Server Error');
      return;
    }

    let contentType = 'text/html';
    if (filePath.endsWith('.css')) contentType = 'text/css';
    if (filePath.endsWith('.js')) contentType = 'application/javascript';

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
