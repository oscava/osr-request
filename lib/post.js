var Client = require("./client");
var debug = require("debug")("osr-request:post");
var querystring = require("querystring");
var Post = Client.extends({
	request:function( options , data , cb ){
		if(data instanceof Function){
			cb = data;
			data = {};
		}
		if(data instanceof Object){
			data = querystring.stringify(data);
		}
		options.method = "POST";
		options.headers['Content-Length'] = data.length;
		this.super("request",arguments);
	}
});

module.exports = Post;