/**
 * @author showen
 */
var Account=require('../controllers/account/account.js');

module.exports={
	//test
	'test':function(req,res){
    },
    //Account
    'account/login': Account.login,
    'err':function(req,res){
        res.json({'err':'err url:'+req.url});
	}
};