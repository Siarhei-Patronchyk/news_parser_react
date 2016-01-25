var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var news;

var router = express.Router();
var urls = ['http://nn.by/?c=ca&i=559', 'http://people.onliner.by', 'http://news.tut.by'];
var urlsLength = urls.length;

function requestParser(arr){
	news = []
	for (var i=0; i<urlsLength; i++) {
		if (arr[i] === 'http://nn.by/?c=ca&i=559') {
			requestNewsNN(arr[i], 'binary', '.list-headline', '.headline-time', '.list-headline .title a', '.grid_1 .image-container img', '.title a', 'nashaniva');
		}
		else {
			if (arr[i] === 'http://people.onliner.by') {
				requestNewsOther(arr[i], null, 'article.b-posts-1-item', 'h3 a span', 'article figure a img', '.b-posts-1-item__text a', 'onliner');
			}
			if (arr[i] === 'http://news.tut.by') {
				requestNewsOther(arr[i], null, '.lists__li', '.lists__li a', '.media img', '.media a', 'tutby');
			}
		}
	};
	function requestNewsNN(url, encoding, parseSource, idParam, titleParam, imgSrcParam, urlParam, sourceParam) {
  		request({url: url, encoding: encoding}, function(err, res, body) {
  		if(err) {
  		  console.log(err);
  		}
  		else {
  		  var $ = cheerio.load(
  		    iconv.encode(
  		      iconv.decode(
  		        new Buffer(body, 'binary'),
  		        'win1251'),
  		      'utf8')
  		    );
  		  $(parseSource).each(function(){
  		    news.push({
  		      id: $(idParam, this).text().match(/\d/gi).join(''),
  		      title: $(titleParam, this).text(),
  		      imgSrc: $(imgSrcParam, this).attr('data-image-src'),
  		      url: 'http://nn.by' + $(urlParam, this).attr('href'),
  		      source: sourceParam
  		    });
  		  })
  		}
  		});
  		return news
	};
	function requestNewsOther(url, encoding, parseSource, titleParam, imgSrcParam, urlParam, sourceParam) {
		request({url: url, encoding: encoding}, function(err, res, body) {
			  if(err) {
			    console.log(err);
			  }
			  else {
			    var $ = cheerio.load(body);
			    $(parseSource).each(function(){
			      news.push({
			        title: $(titleParam, this).text(),
			        imgSrc: $(imgSrcParam, this).attr('src'),
			        url:$(urlParam, this).attr('href'),
			        source: sourceParam
			      });
			    })
			  }
			});
		return news
	};
}

require("node-jsx").install({
    harmony: true, 
    extension: ".jsx"
});

var React = require("react"),
    App = React.createFactory(require("../public/javascripts/components/app"));

/* GET home page. */
router.get('/', function(req, res) {
  var markup = React.renderToString(App());  
  requestParser(urls);    
  res.render('index', { 
    title: 'Express',
    markup: markup 
  });
});
router.get('/news', function(req, res) {
  res.send(news);
});

module.exports = router;
