
/*
 * GET home page.
 */

exports.index = function(req, res){
  fs = require("fs");
  if (typeof req.params.markdownfile === 'undefined') {
    	req.params.markdownfile = 'index';
	}

  fs.readFile('doc/' + req.params.markdownfile + '.md', function(err, data) {
  	console.log(req.params.markdownfile);
  	

  	res.render('index', { title: 'MScratch', markdownfile: req.params.markdownfile, text: data});
  });
};

exports.save = function(req, res){
  console.log(req.body);
  fs = require("fs");
  fs.writeFile('doc/' + req.body.markdownfile + '.md', req.body.text, function (err) {
  	res.send({ result: err?"Error":"Ok" });
  });
};