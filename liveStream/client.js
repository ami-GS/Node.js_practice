var canvas =  document.getElementById("liveCanvas");;
var context =  canvas.getContext("2d");

//canvas = document.getElementById("liveCanvas");
//context = canvas.getContext("2d");

var ws = new WebSocket("ws://localhost:8080/camera");
ws.onopen = function(){
	console.log("connection was established");
};
ws.onmessage = function(evt){	
	context.drawImage(evt.data,0,0);
};

function printProperties(obj) {
    var properties = '';
    for (var prop in obj){
        properties += prop + "=" + obj[prop] + "\n";
    }
    alert(properties);
};
