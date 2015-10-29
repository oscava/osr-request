var Class = require("osr-class");
var debug = require("debug")("osr-request:client");
var querystring = require("querystring");
var Client = Class.extends({
	_mustExtend:true,
	$:function( client ){
		this.client = client;
	},
	request:function( options, data, cb ){
		if(data instanceof Object){
			data = querystring.stringify(data);
		}
		debug("options",options);
		debug("data",data);
		options.agent = false;
		var request = this.client.request( options , function( res ){
			debug("statusCode",res.statusCode);
			debug("headers",res.headers);
			var content = "";
			res.on('data',function(chunk){
				content+=chunk;
			});
			res.on("end",function(){
				cb(null,{ statusCode: res.statusCode, headers:res.headers, data: content });
			});
		});
		request.on("error",function( err ){
			cb( err ,null );
		});
		if(data.length!==0){
			request.write(data+"\n");
		}
		request.end();
	}
});

module.exports = Client;