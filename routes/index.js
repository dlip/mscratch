
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

  	if(typeof filelist !== 'undefined') {
	  	filelist.sort();
  	}

  	var sortedfilelist = new Array;
  	var sortedblogfilelist = new Array;
  	for (var index in filelist) {
  		if(filelist[index].indexOf(".md") != -1) {
  			var contents = fs.readFileSync('doc/' + filelist[index]).toString();
  			var offset = contents.indexOf('\n');
  			if(offset>0) {
	  			contents = contents.substring(0, offset);
  			}
  			cutfile = filelist[index].substring(0,filelist[index].length-3)
  			if(cutfile.match(/\d\d\d\d-\d\d-\d\d/g)) {
  				sortedblogfilelist.push({file: cutfile, contents: contents} );
  			}
  			else {
  				sortedfilelist.push({file: cutfile, contents: contents} );
  			}
  		}
  	}
  	sortedblogfilelist.reverse();
  	var today = new Date();
  	var todayDate = (today.getDate() < 10) ? ("0" + today.getDate()) : today.getDate();
  	var todayMonth = (today.getMonth() < 10) ? ("0" + today.getMonth()) : today.getMonth();
  	var todayfile = today.getFullYear() + '-' + todayMonth + '-' + todayDate;

    res.render('list', { title: 'MScratch', files: sortedfilelist, blogfiles:sortedblogfilelist, todayfile: todayfile });
  });
};