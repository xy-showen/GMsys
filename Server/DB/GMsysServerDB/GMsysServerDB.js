var configs = require('../../configs/configs.js');

mongoose = require('mongoose');



function GMsysServerDB() {

	this.conn = configs.GMsysServerDB_url;

	this.schemas = {};

	this.connection = null;

	//this.models={};



	this.inited = false;

}



GMsysServerDB.prototype.regisModel = function(modelName, schema){

	this.schemas[modelName] = schema;

	//this.models[modelName]=model;

	mongoose.model(modelName, schema);

};



GMsysServerDB.prototype.init = function(callback) {

	if (this.inited) {

		if (callback) {

			callback();

		}

		return;

	}

	var _self = this;

	this.inited = true;

	console.log('connect:' + this.conn + "...");

	mongoose.set('debug', true);



	//mongoose.disconnect();

	this.connection = mongoose.createConnection(this.conn, function() {

		console.log("has connected db:"+_self.conn);

		if (callback) {

			callback();

		}

	});





	var connected = false;



	//this.connection=mongoose.connection;

	var timer;

	// this.connection('open',function(){

	// 	console.log("has connected db:"+_self.conn);

	// 	if(!connected){

	// 		connected=true;

	// 		if(callback){

	// 			callback();

	// 		}

	// 	}

	// });

	// this.connection('error',function(err){

	// 	console.log("connect db:"+_self.conn+" err:"+err);

	// 	if(timer){

	// 		clearTimeout(timer);

	// 	}

	// 	timer=setTimeout(function(){

	// 		mongoose.connect(_self.conn);

	// 	},20);

	// 	mongoose.disconnect();

	// });

};





GMsysServerDB.prototype.getModelByName = function(name) {

	var schema = this.schemas[name];

	if (!schema) {

		return null;

	}

	return this.connection.model(name);//, schema);

};

module.exports = new GMsysServerDB();