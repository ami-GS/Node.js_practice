var http = require("http");
var url = require("url");
var net = require("net");
var port = 8080;


function start() {
	
	function onCliRequest(cliReq, cliRes) {
		function onSvrResponse(svrRes){
			cliRes.writeHead(svrRes.statusCode, svrRes.headers);
			svrRes.pipe(cliRes);
		};
		
		var req = url.parse(cliReq.url);
		var options = {host: req.hostname, port: req.port || 80, path: req.path,
					  method: cliReq.method, headers: cliReq.headers};
		var svrReq = http.request(options, onSvrResponse);//like fetch
		cliReq.pipe(svrReq);
		svrReq.on("error", function onSvrReqErr(err) {
			cliRes.writeHead(400, err.message, {"Content-Type": "text/html"});
			cliRes.end("<h1>" + err.message + <br/> + cliReq.url + "</h1>");
			printError(err, "svrReq", req.hostname + ":" + (req.port || 80));
		});
	};

	var httpServer = http.createServer(onCliRequest).listen(port);

	httpServer.on("clientError", function onCliErr(err, cliSoc) {
		cliSoc.end();
		printError(err, "cliErr", "");
	});
	
	httpServer.on("connect", function onCliConnect(cliReq, cliSoc, cliHead) {
		var req = url.parse("https://" + cliReq.url);
		var svrSoc = net.connect(req.port || 443, req.hostname, 
								 function onSvrConnect(svrRes, svrSoc2, svrHead) {
			cliSoc.write("HTTP/1.0 200 Connection established\r\n\r\n");
		});
	});

	httpServer.on("close", function() {console.log("Sever closed")});


};
