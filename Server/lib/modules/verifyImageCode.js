var GMsysServerDB = require('../../DB/GMsysServerDB/GMsysServerDB.js'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var verifyImageCode = new Schema({
	Guid: String,
	imageCode: String,
	date: {
		type: Date,
		default: new Date()
	}
});



verifyImageCode.statics.saveImageCode=function(Guid,imageCode,date){
	verifyImageCodeM=GMsysServerDB.getModelByName('verifyImageCode');
	verifyImageCodeM.findOne({'Guid':Guid},function(err,doc){
		if(err){
			console.log("find ImageCode err:"+err);
		}else{
			if(!doc){
				newVerifyImageCode=new verifyImageCodeM({
					'Guid':Guid,
					'imageCode':imageCode,
					'date':new Date()
				});
				newVerifyImageCode.save(function(err){
					if(err){
						console.log("saveImageCode err:"+err);
					}else{

					}
				});
			}
		}
	});
};

GMsysServerDB.regisModel('verifyImageCode', verifyImageCode);