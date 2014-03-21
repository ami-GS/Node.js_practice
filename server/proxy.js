var http = require("http");
var url = require("url");
var port = 8080;

//cliReq : client request to proxy  #1
//proReq : proxy request to server  #2
//proRes : proxy response to client #4
//svrRes : server response to proxy #3
//cliReq -> proReq -> svrRes -> proRes

http.createServer(function (cliReq, proRes) {
	var reqUrl = url.parse(cliReq.url);
	var body = "";
	console.log(reqUrl.href);
	
	cliReq.on("data", function(data) {
		body += data; // #1
	});

	cliReq.on("end", function(){
		var proReq = http.request({host: cliReq.headers.host,port: reqUrl.port || 80,
								   path: reqUrl.path || "www.googole.com",
								   method: cliReq.method,headers: cliReq.headers},
		function(svrRes){
			proRes.writeHead(svrRes.statusCode, svrRes.headers);
			svrRes.on("data", function(chunk){
				proRes.write(chunk); // #3 -> #4
			});
			svrRes.on("end", function() {
				proRes.end();
			});
		});

		if (body.length > 0) {
			proReq.write(body); // #2
		}
		proReq.end();
	});
}).listen(port);
