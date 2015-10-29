var Client = require("./client");
var debug = require("debug")("osr-request:get");
var querystring = require("querystring");
var Get = Client.extends({
	request:function(options,data,cb){
		if(data instanceof Function){
			cb = data;
			data = {};
		}
		if(data instanceof Object){
			data = querystring.stringify(data);
		}
		options.method = "GET";
		if(-1 === options.path.indexOf("?")){
			options.path +=("?"+data);
		}else{
			options.path +=("&"+data);
		}
		data = {};
		this.super("request",arguments);
	}
});

module.exports = Get;