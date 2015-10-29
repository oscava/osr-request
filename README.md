##OSR-REQUEST
###How to use

	npm install osr-request

###example
	
	var osrQ = require("osr-request");

	var url = "http://127.0.0.1:3000/";

	var data = { name: "cavacn" }

####POST( url, [data], cb);

	osrQ.post( url , data , function( err, result){
		//err
		//result { statusCode : 200 , headers: {}, data: "....." };
	});

####GET( url, [data], cb);

	osrQ.get( url , data, function( err, result){
		//err
		//result { statusCode : 200, headers: {}, data: "......" };
	});

	osrQ.get( url , data, function( err, result){
		//err
		//result { statusCode : 200, headers: {}, data: "......" };
	});