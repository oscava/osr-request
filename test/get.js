require("should");
var	osrr = require("../");
describe("GET",function(){
	it("Get  https://www.baidu.com , the status code should be 200",function( done ){
		osrr.get("https://www.baidu.com",{},function( err, data ){
			data.statusCode.should.eql(200);
			done();
		});
	});
	
	it("Get  http://www.sina.com.cn , the status code should be 200",function( done ){
		osrr.get("http://www.sina.com.cn",function( err, data ){
			data.statusCode.should.eql(200);
			done();
		});
	});
	
	it("Get  http://127.0.0.1:8888/hello?a=b , this status code should be 200" ,function(done){
		osrr.get("http://127.0.0.1:8888/hello?a=b",{c:"d"},function( err, data){
			data.statusCode.should.eql(200);
			done();
		});
	});
	
	it("Get  http://127.0.0.1:8888/hello , this status code should be 200" ,function(done){
		osrr.get("http://127.0.0.1:8888/hello",{c:"d"},function( err, data){
			data.statusCode.should.eql(200);
			done();
		});
	});
	
	it("Post http://127.0.0.1:8888/hello , this status code should be 200" ,function(done){
		osrr.post("http://127.0.0.1:8888/hello",{c:"d"},function( err, data){
			data.statusCode.should.eql(200);
			done();
		});
	});
	
	it("Post http://127.0.0.1:8888/hello , this status code should be 200" ,function(done){
		osrr.post("http://127.0.0.1:8888/hello",function( err, data){
			data.statusCode.should.eql(200);
			done();
		});
	})
});