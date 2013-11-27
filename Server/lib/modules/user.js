var GMsysServerDB = require('../../DB/GMsysServerDB/GMsysServerDB.js'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var user = new Schema({
	userName: {
		type: String,
		unique: true
	},
	passWord: String,
	isLogined: {
		type: Boolean,
		default: false
	}
});

user.statics.login = function(userName, passWord, callback) {
	userM = GMsysServerDB.getModelByName('user');
	userM.findOne({
		'userName': userName
	}, function(err, doc) {
		if (err) {
			console.log("login err:" + err);
		} else {
			if (doc) {
				if (doc.passWord == passWord) {
					if (doc.isLogined == true) {
						console.log("user is logined");
						return callback(3);
					} else {
						return callback(0);
					}

				} else {
					console.log('passWord is wrong');
					return callback(2);
				}
			} else {
				console.log("has no user");
				return callback(1);
			}
		}
	});
};


user.statics.addUsers = function() {
	userM = GMsysServerDB.getModelByName('user');
	userM.count(function(n) {
		if (n < 1) {
			var user1 = new userM({
				'userName': 'ply1',
				'passWord': 'test'
			});
			var user2 = new userM({
				'userName': 'ply2',
				'passWord': 'test'
			});
			user1.save(function(err) {
				if (err) {
					console.log('create ply1 err:' + err);
				}
			});
			user2.save(function(err) {
				if (err) {
					console.log('create ply2 err:' + err);
				}
			});
		}
	});

};


GMsysServerDB.regisModel('user', user);
