var Class = require("osr-class");
var debug = require("debug")("osr-request:client");
var querystring = require("querystring");
var iconv = require("iconv-lite");
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
			var contenttype = res.headers['content-type'] || res.headers['Content-Type'];
			var reg = /charset=([\w\W]+)[;]?[\s]?/;
			var charset = contenttype.match(reg);
			if(charset){
				charset = charset[1].toLowerCase();
			}else{
				charset = "utf-8";
			}
			if("gbk" === charset){
				res.setEncoding("binary");
			}
			var content = "";
			res.on('data',function(chunk){
				content+=chunk;
			});
			res.on("end",function(){
				// console.log(iconv.decode(new Buffer(content,'binary'),charset.toLowerCase()));
				cb(null,{ statusCode: res.statusCode, headers:res.headers, data: iconv.decode(content,charset) });
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