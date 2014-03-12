var net = require("net");

var server = net.createServer(function(c) {
	console.log("server connected");
	c.setEncoding("utf8")

	c.addListener("data", function(data){
		c.write(data);
		c.end();
	});

	c.on("end", function(){
		console.log("server disconnected");
	});
	
	c.write("hello\r\n");
	c.pipe(c);
});
server.listen(8888, function() {
	console.log("server bound");
});
