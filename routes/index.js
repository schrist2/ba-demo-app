var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var aws = require('aws-sdk');

/* GET home page. */
router.get('/', function(req, res, next) {
	//configuring the AWS environment
	aws.config.update({
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY
	  });

	var s3 = new aws.S3();

	//configuring parameters
	var params = {
	  Bucket: process.env.S3_BUCKET,
	  Body: "Test content",
	  Key: Date.now() + '.txt'
	};

	s3.upload(params, function (err, data) {
	  //handle error
	  if (err) {
		res.status(400);
		res.send('S3 upload failed: ' + err);
		return;
	  }
	});
	
    var connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    });

    connection.connect(function(err) {
        if (err) {
            res.status(400);
            res.send('MySQL connection failed: ' + err);
            return;
        }

        connection.end();

        res.render('index', { title: 'Express' });
    });
});

module.exports = router;
