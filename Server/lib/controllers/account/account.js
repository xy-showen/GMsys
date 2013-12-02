/**
 * @author showen
 */
var GMsysServerDB = require('../../../DB/GMsysServerDB/GMsysServerDB.js');


exports.login = function(req, res) {
	var userM = GMsysServerDB.getModelByName('user');
	if (global.clients.hasOwnProperty(req.body.userName)) {
		return res.json({
			"status": 3//已在线
		});
	}
	userM.login(req.body.userName, req.body.passWord, function(status) {
		if (0 == status) {
			req.session.userName = req.body.userName;
			global.clients[req.body.userName] = req.session;
		}
		return res.json({
			"status": status
		});
	});
};