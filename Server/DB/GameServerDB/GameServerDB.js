/**
 * @author showen
 */
var configs=require('../configs/configs.js');
    mongoose=require('mongoose');

function GameServerDB(){
	this.conn=configs.GameServerDB_url;
	this.schemas={};
	this.connection=null;
	//this.models={};
	this.inited=false;
}

GameServerDB.prototype.regisModel=function(modelName,schema){
	this.schemas[modelName]=schema;
	//this.models[modelName]=model;
	this.connection.model(modelName,schema);
};

GameServerDB.prototype.init=function(callback){
	if(this.inited){
		if(callback){
			callback();
		}
		return;
	}

	var _self=this;
	this.inited=true;
	console.log('connect:'+this.conn+"...");
	mongoose.set('debug',true);
	mongoose.disconnect();
	this.connection=mongoose.createConnection(this.conn,function(){
		if(err){
			console.log("connect "+_self.conn+" has err:"+err);
			return;
		}
		console.log("has connected db:"+_self.conn);
		if(callback){
			callback();
		}

	});

	var connected=false;
	var timer;

};





GameServerDB.prototype.getModelByName=function(name){
	var schema=this.schemas[name];
	if(!schema){
		return null;
	}
	return this.connection.model(name);//,schema);
};

module.exports=new GameServerDB();