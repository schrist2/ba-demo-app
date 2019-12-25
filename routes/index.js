var express = require('express');
var router = express.Router();

var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
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
