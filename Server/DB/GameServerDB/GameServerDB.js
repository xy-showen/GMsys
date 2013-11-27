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

	mongoose.model(modelName,schema);

}



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

		console.log("has connected db:"+_self.conn);

		if(callback){

			callback();

		}

	});



	var connected=false;



	//this.connection=mongoose.connection;

	var timer;

	// this.connection.once('open',function(){

	// 	console.log("has connected db:"+_self.conn);

	// 	if(!connected){

	// 		connected=true;

	// 		if(callback){

	// 			callback();

	// 		}

	// 	}

	// });

	// this.connection.on('error',function(err){

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





GameServerDB.prototype.getModelByName=function(name){

	var schema=this.schemas[name];

	if(!schema){

		console.log("2222");

		return null;

	}

	console.log("33333");

	return this.connection.model(name);//,schema);

};

module.exports=new GameServerDB();