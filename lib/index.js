var Class = require("osr-class");
var http = require("http");
var https = require("https");
var Post = require("./post");
var Get = require("./get");
var Request = Class.extends({
	_defaultHeaders:{
		'Content-Type':'application/x-www-form-urlencoded',
		'X-Powered-By':'osr-request@oscava.com',
		'User-Agent':'Mozilla/5.0 (Macintosh; Intel Cava OS X 10_7_0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11'
	},
	$:function(){
		
	},
	post:function( url, data, cb ){
		var protocol = this.getProtocol( url );
		var client = null;
		if( "http" === protocol){
			client = http;
		}else if("https" === protocol){
			client = https;
		}else{
			cb(new Error(protocol+" the protocol is not support"));
		}
		new Post(client).request( this.getOptions(url), data, cb );
	},
	get:function( url , data, cb ){
		var protocol = this.getProtocol( url );
		var client = null;
		if( "http" === protocol){
			client = http;
		}else if("https" === protocol){
			client = https;
		}else{
			cb(new Error(protocol+" the protocol is not support"));
		}
		new Get(client).request( this.getOptions(url), data, cb );
	},
	getOptions: function( url ){
		var options = {
			host:this.getHost(url),
			port:this.getPort(url),
			path:this.getPath(url),
			headers:this._defaultHeaders
		}
		return options;
	},
	getPath:function( url ){
		var pathPattern = /\w+:\/\/([^\/]+)(\/.+)(\/$)?/i;
		var fullPath = url.match(pathPattern);
		return fullPath?fullPath[2]:'/';
	},
	getPort:function( url ){
		var hostPattern = /\w+:\/\/([^\/]+)(\/)?/i;
		var domain = url.match(hostPattern);
		var pos = domain[1].indexOf(":");
		if(pos !== -1) {
			domain[1] = domain[1].substr(pos + 1);
			return parseInt(domain[1]);
		} else if(url.toLowerCase().substr(0, 5) === "https") return 443;
		else return 80;
	},
	getHost:function( url ){
		var hostPattern = /\w+:\/\/([^\/]+)(\/)?/i;
		var domain = url.match(hostPattern);
		var pos = domain[1].indexOf(":");
		if(pos !== -1) {
			domain[1] = domain[1].substring(0, pos);
		}
		//console.log(domain[1]);
		return domain[1];
	},
	getProtocol:function( url ){
		return url.substring(0,url.indexOf(":"));
	}
});

module.exports = new Request();