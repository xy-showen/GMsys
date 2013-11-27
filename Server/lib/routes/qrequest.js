/**
 * Request prototype.
 */

var req = exports = module.exports = {
};

Object.defineProperties(req, 
	{'url': {
		enumerable: true,
	    /**
	     * Returns the current clients
	     * @api public
	     */
	    get: function () {
	      return this.url || '/';
	    }
     },
	 'method':{
		enumerable: true,
	    /**
	     * Returns the current clients
	     * @api public
	     */
	    get: function () {
	      return this.method || 'GET';
	    }
	},
	 'body':{
		enumerable: true,
	    /**
	     * Returns the current clients
	     * @api public
	     */
	    get: function () {
	      return this.data || {};
	    }
	},
	'_body':{
		enumerable: true,
	    /**
	     * make bodyParser ignore 
	     * @api public
	     */
	    get: function () {
	      return true;
	    }
	},
	'user':{
		
	}
   }
);