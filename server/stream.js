var http = require("http");

var server = http.createServer(function (req, res) {
	var body = "";
	req.setEncoding("utf8");
	req.on("data", function(chunk) {
		body += chunk;
	});

	req.on("end", function () {
		try {
			var data = JSON.parse(body);
		} catch (err) {
			res.statusCode = 400;
			return res.end("error: " + err.message);
		}
		console.log("send data");
		res.write(typeof data);
		res.end();
	});
});

server.listen(8080);
//curl 127.0.0.1:8080 -d "{}"
