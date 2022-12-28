

var express = require('express');
var router = express.Router();

router.get("/", function(request, response, next){

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('sample_data', {title:'Node.js MySQL CRUD Application', action:'list', sampleData:data});
		}

	});

});

module.exports = router;
