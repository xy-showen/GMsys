/**
 * Module dependencies.
 */


/**
 * Response prototype.
 */

var res = module.exports = {
};

/**
 * not implemetations
 */

// methods in express response
res.get = res.set =res.header=res.contentType = res.type=res.status=res.links = res.jsonp = res.sendfile = res.download = res.format = res.attachment = 
res.clearCookie = res.cookie = res.redirect = 
res.render = res.writeContinue = res.writeHeader = res.send = function(){
	console.log("oh,no header");
	throw new Error('not implemtation in websocket');
};

res.setHeader= function(name, value) { 
	this._headers[name]=value;
}


/**
 * Send JSON response.
 *
 * Examples:
 *
 *     res.json(null);
 *     res.json({ user: 'tj' });
 *     res.json(500, 'oh noes!');
 *     res.json(404, 'I dont have that');
 *
 * @param {Mixed} obj or status
 * @param {Mixed} obj
 * @return {ServerResponse}
 * @api public
 */

res.json = function(obj){
  // allow status / body
 //  if (2 == arguments.length) {
	// this._headers['status']=arguments[0];
 //    obj = arguments[1];
 //  }
  // settings
  // var app = this.app;
  // var replacer = null;//app.get('json replacer');
  // var spaces = 2;//app.get('json spaces');
  //set headers

  var returnValue = {};
  for (var header in this._headers) {
    returnValue[header] = this._headers[header];
  }
  returnValue['data'] = obj;
  returnValue = JSON.stringify(returnValue,null,2);//, replacer, spaces);

  //global.innerClient.send(returnValue);
  this.connection.send(returnValue);
  //console.timeEnd(this._headers.uuid.toString()+this._headers.url);
};