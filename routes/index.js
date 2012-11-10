
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
 
  writeFile = function() {
  	fs.writeFile('doc/' + req.body.markdownfile + '.md', req.body.text, function (err) {
		res.send({ result: err?"Error":"Ok" });
	});
  };
  fs.exists = fs.exists || require('path').exists;
  fs.exists('doc/', function (exists) {
  	if(!exists) {
  		fs.mkdir('doc', function() {
		writeFile();
		});
  	}
  	else {
  		writeFile();
  	}

  });
 
};

exports.delete = function(req, res){
	fs = require("fs");
	console.log(req.body.markdownfile );
	fs.unlink('doc/' + req.body.markdownfile + '.md', function() {
		res.send({ result: "Ok" });
	});
};

exports.list = function(req, res){
  fs = require("fs");
  fs.readdir('doc/', function(err, filelist) {
  	console.log(filelist);
  	filelist.sort();

  	var sortedfilelist = new Array;
  	for (var index in filelist) {
  		if(filelist[index].indexOf(".md") != -1) {
  			cutfile = filelist[index].substring(0,filelist[index].length-3)
  			sortedfilelist.push(cutfile);
  		}
  	}

    res.render('list', { title: 'MScratch', files: sortedfilelist });
  });
};