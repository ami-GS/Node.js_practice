var dns = require("dns");

dns.resolve4("google.com", function(err, addresses){
	if (err) throw err;

	console.log("addresses" + JSON.stringify(addresses));
	
	addresses.forEach(function(address){
		dns.reverse(address, function(err, domains) {
			if(err){throw err;}
			console.log("reverse for" + address + ": " + JSON.stringify(domains));
		});
	});
});
