/**
 * @author showen
 */
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
	this.connection.model(modelName, schema);
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
	this.connection = mongoose.createConnection(this.conn, function(err) {
		if(err){
			console.log("connect "+_self.conn+" has err:"+err);
			return;
		}
		console.log("has connected db:"+_self.conn);
		if (callback) {
			callback();
		}
	});
	var connected = false;
	var timer;

};



GMsysServerDB.prototype.getModelByName = function(name) {
	var schema = this.schemas[name];
	if (!schema) {
		return null;
	}
	return this.connection.model(name);//, schema);
};
module.exports = new GMsysServerDB();