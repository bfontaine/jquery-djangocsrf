// based on https://github.com/carhartl/jquery-cookie/blob/master/test/server.js
var http = require('http');
var url  = require('url');
var path = require('path');
var fs   = require('fs');

function setServerFlag( content, name ) {
	if (/\.html$/.test(name)) {
		return content.replace('/*SERVER_FLAG*/', 'window._in_browser = true;');
	}
	return content;
}

http.createServer(function(request, response) {

	if (request.url == '/csrf') {
		// AJAX endpoint. Returns the X-CSRFToken header
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.write(JSON.stringify({
			present: request.headers.hasOwnProperty('x-csrftoken'),
			value: request.headers['x-csrftoken']
		}));
		response.end();
		return;
	}

	var uri = url.parse(request.url).pathname;

	// Avoid path traversal
	if (path.normalize(decodeURI(uri)) !== decodeURI(uri)) {
		response.statusCode = 403;
		response.end();
		return;
	}

	var filename = path.join(process.cwd(), uri);

	fs.readFile(filename, 'binary', function(err, file) {
		if (err) {
			response.writeHead(500, { 'Content-Type': 'text/plain' });
			response.write(err + '\n');
			response.end();
			return;
		}

		response.writeHead(200, /\.js$/.test(filename) ? { 'Content-Type': 'text/javascript' } : {});
		response.write(setServerFlag(file, filename), 'utf-8');
		response.end();
	});

}).listen(8124, '0.0.0.0');

console.log('Test suite at http://0.0.0.0:8124/test/index.html');
