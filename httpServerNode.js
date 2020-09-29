const https = require('https');
const fs = require('fs');
const path = require('path');

const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
};

var sourceFiles = 'C:/Users/Lion/Desktop/faceWebApp';

https.createServer(options, function (request, response) {
		
	var contentType = 'text/html';
    var filePath = '.' + request.url;
	
    if (filePath == './'){
        filePath = sourceFiles + '/index.html';
	}
	else{
		filePath = sourceFiles + request.url;
	}

    var extname = path.extname(filePath);
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      			
    }

    fs.readFile(filePath, function(error, content) {
		
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {			
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8008);
console.log('Server home: ', __dirname);
console.log('Server source: ', sourceFiles);
console.log('Server at: ', 'https://localhost:8008');
