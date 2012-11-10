
/*
 * GET home page.
 */

exports.index = function(req, res){
  fs = require("fs");
  fs.readFile('doc/index.md', function(err, data) {
  	res.render('index', { title: 'MDoc', text: data});
  });
};

exports.save = function(req, res){
  console.log(req.body);
  fs = require("fs");
  fs.writeFile('doc/index.md', req.body.text, function (err) {
  	res.send({ result: err?"Error":"Ok" });
  });
};