var net = require("net");

var client = net.connect(
	{port:8888},
	function() {
		console.log("client connected");
		client.write("world");
	});


process.stdin.setEncoding("utf8");
process.stdin.on("data", function(chunk) {
	client.write(chunk);
});

client.on("data", function(data) {
	console.log(data.toString());
	client.end();
});

client.on("end", function() {
	console.log("client disconnected");
});
