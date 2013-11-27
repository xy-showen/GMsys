var path = require("path");
var fs=require("fs");

function route(handle,pathname,request,response)
{
	console.log("About to route a request for "+pathname);
	if(typeof handle[pathname]==='function')
		handle[pathname](request,response);
	else
		{
		 var mime = require("./mime").types;
		 var ext = path.extname(pathname);
         ext = ext ? ext.slice(1) : 'unknown';
         var contentType = mime[ext] || "text/plain";

     pathname="./"+pathname;
		 path.exists(pathname,function(exists) {	
        if (!exists) {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(pathname, "binary", function(err, file) {

                if (err) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end(err);
                } else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.write(file, "binary");
                    response.end();
                }
             });
          }
      });
	}
}
module.exports=route;