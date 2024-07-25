// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    var query = url.parse(req.url).query;
    var params = querystring.parse(query);

    switch (path) {
        case '/':
            fs.readFile(__dirname + '/index.html', function (err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading index.html');
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
            break;

        case '/comments':
            if (req.method === 'POST') {
                var body = '';
                req.on('data', function (data) {
                    body += data;
                });

                req.on('end', function () {
                    var post = querystring.parse(body);
                    console.log(post);
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('You sent the name "' + post.name + '".\n');
                });
            } else {
                res.writeHead(404);
                res.end();
            }
            break;

        default:
            res.writeHead(404);
            res.end();
            break;
    }
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');