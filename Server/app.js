/**
 * @author showen
 */
var http = require('http'),
	url = require("url"),
	configs = require("./configs/configs.js"),
	WebSocketServer = require('ws').Server,
	qrequest = require('./lib/routes/qrequest.js'),
	qresponse = require('./lib/routes/qresponse.js'),
	analyzeHttpReq = require("./lib/routes/analyzeHttpReq.js"),
	httpRouter = require("./lib/routes/httpRouter.js"),
	wsRouter = require("./lib/routes/wsRouter"),
	GMsysServerDB=require("./DB/GMsysServerDB/GMsysServerDB.js");

global.clients = {};

function initReqRes(req, res) {
	req.__proto__ = qrequest;
	res.__proto__ = qresponse;
};


GMsysServerDB.init(function(){
	require('./lib/modules/user.js');
	require('./lib/modules/verifyImageCode.js');
	GMsysServerDB.getModelByName('user').addUsers();
});

var GMsysHttpServer = http.createServer(function(req, res) {
	var pathName = url.parse(req.url).pathname;
	analyzeHttpReq(httpRouter, pathName, req, res);
}).listen(configs.GMsysHttpServer_port);

var GMsysWSServer = new WebSocketServer({
	port: configs.GMsysWSServer_port
}, function(err) {
	if (err) {
		console.log("createws has err:" + err);
	} else {
		console.log("create GMsysWSServer succ");
	}
});


GMsysWSServer.on("connection", function(client) {
	var session = {
		'connection': client,
		'userName': '',
		'connectionDate': new Date().getTime(),
		'isLogin': false
	};
	client.on('message', function(message) {
		try {
			var req = JSON.parse(message);
		} catch (err) {
			console.log('illegal format');
			client.close(4001, 'illegal format');
			return;
		}
		if (!session.isLogin && req.url != "/account/login") {
			client.close(4001, 'can not request before login done');
		} else {
			req.session = session;
			var res = {
				connection: client,
				_headers: {
					"url": req.url
				}
			};
			initReqRes(req, res);
			var cliUrl = req.url;
			if (req.url.substring(0, 1) == "/") {
				cliUrl = cliUrl.substring(1);
			}
			if (wsRouter.hasOwnProperty(cliUrl)) {
				wsRouter[cliUrl](req, res);
			} else {
				wsRouter["err"](req, res);
			}
		}
	});

	client.on('close',function(code,message){
		if(session.userName){
			console.log(session.userName+" has quit");
			delete global.clients[session.userName];
		}
	});
});

