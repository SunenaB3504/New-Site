const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname; // Serve files from the current directory

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Sanitize and resolve the file path
    let requestedUrl = req.url;
    if (requestedUrl === '/') {
        requestedUrl = '/index.html'; // Serve index.html for the root URL
    }

    // Prevent directory traversal attacks
    const unsafeFilePath = path.join(PUBLIC_DIR, requestedUrl);
    const filePath = path.normalize(unsafeFilePath).replace(/^(\.\.[\/\\])+/, '');

    // Ensure the resolved path is still within the public directory
    if (!filePath.startsWith(PUBLIC_DIR)) {
        console.warn(`Attempted directory traversal: ${requestedUrl}`);
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }


    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                console.error(`File not found: ${filePath}`);
                fs.readFile(path.join(PUBLIC_DIR, '404.html'), (err404, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    if (err404) {
                        res.end('404 Not Found'); // Fallback if 404.html is missing
                    } else {
                        res.end(content404, 'utf-8');
                    }
                });
            } else {
                // Other server error
                console.error(`Server error reading file: ${filePath}`, error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 Internal Server Error');
            }
        } else {
            // File found, serve it
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
            console.log(`Served: ${filePath} as ${contentType}`);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Serving files from: ${PUBLIC_DIR}`);
});

// Basic error handling for the server itself
server.on('error', (err) => {
    console.error('Server error:', err);
});
