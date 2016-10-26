//import http core module
var http = require('http');
//import file system core module
var fs = require('fs');
//import path core module
var path = require('path');

//local variables
var hostname = 'localhost';
var port = 3000;

//Define the server Object.
var server = http.createServer(function(req,res){
	//We print URL and request method
	console.log('Request for '+req.url+' bt method '+req.method);

	//If hte request method is GET then
	if(req.method == 'GET'){
		var fileUrl;
		//When there is no path
		if(req.url == '/'){
			fileUrl = '/index.html';
		}else{
			//When there is path
			fileUrl = req.url;
		}
		//it will change '/' to '\' in case we execute this code in Windows in order to adapt properly hte path.
		var filePath = path.resolve('./public'+fileUrl);
		//Get the file extension that we are going to return
		var fileExt = path.extname(filePath);

		//With this we will prevent to send filetypes that we don't want
		if(fileExt == '.html'){
			fs.exists(filePath, function(exist){

				if(!exist){
					res.writeHead(404, { 'Content-Type': 'text/html' });
        			res.end('<html><body><h1>Error 404: ' + fileUrl + 
                        ' not found</h1></body></html>');
        			return;
				}
				//We serve the page normally
				res.writeHead(404, {'Content-Type': 'text/html'});
				fs.createReadStream(filePath).pipe(res);
			})
		}else{
			//here we work with non .html request
			res.writeHead(404, { 'Content-Type': 'text/html' });
        	res.end('<html><body><h1>Error 404: ' + fileUrl + 
                        ' not found</h1></body></html>');
		}
	}else{
			//Here we deal with non GET request
			res.writeHead(404, { 'Content-Type': 'text/html' });
        	res.end('<html><body><h1>Error 404: ' + req.method + 
                ' not supported</h1></body></html>');
		}
})

//Start the server
server.listen(port,hostname, function(){
	console.log('Server running at http://'+hostname+':'+port);
});