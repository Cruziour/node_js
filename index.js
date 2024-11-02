const http = require('http');
const fs = require('fs').promises; // Use promises for async file operations

const PORT = 3000;
const hostname = 'localhost';

const server = http.createServer(async (request, response) => {
    try {
        let filePath;

        // Determine the file path based on the request URL
        switch (request.url) {
            case '/':
                filePath = './home.html';
                break;
            case '/about':
                filePath = './about.html';
                break;
            case '/contact':
                filePath = './contact.html';
                break;
            default:
                filePath = './pagenotFound.html';
                response.statusCode = 404; // Set response status to 404 for not found
        }

        // Read the requested file asynchronously
        const content = await fs.readFile(filePath, 'utf-8');
        response.end(content);
    } catch (error) {
        console.error('Error reading file:', error);
        response.statusCode = 500; // Set response status to 500 for server error
        response.end('Internal Server Error');
    }
});

server.listen(PORT, hostname, () => {
    console.log(`Server is running on http://${hostname}:${PORT}`);
});