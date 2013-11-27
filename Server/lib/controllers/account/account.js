var user = require('../../modules/user.js'),
	GMsysServerDB = require('../../../DB/GMsysServerDB/GMsysServerDB.js');


exports.login = function(req, res) {
	var userM = GMsysServerDB.getModelByName('user');
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