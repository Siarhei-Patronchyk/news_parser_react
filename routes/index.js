var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var news;
var newsOnliner;
var newsTut;
var router = express.Router();

function requestParser(){
  request({url:'http://nn.by/?c=ca&i=559', encoding: 'binary'}, function(err, res, body) {
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
    news = [];
    $('.list-headline').each(function(){
      news.push({
        id: $('.headline-time', this).text().match(/\d/gi).join(''),
        title: $('.list-headline .title a', this).text(),
        imgSrc: $('.grid_1 .image-container img', this).attr('data-image-src'),
        url:'http://nn.by' + $('.title a', this).attr('href')
      });
    })
  }
  });
  request({url:'http://people.onliner.by', encoding: null}, function(err, res, body) {
    if(err) {
      console.log(err);
    }
    else {
      var $ = cheerio.load(body);
      newsOnliner = [];
      $('article.b-posts-1-item').each(function(){
        newsOnliner.push({
          title: $('h3 a span', this).text(),
          imgSrc: $('article figure a img', this).attr('src'),
          url:$('.b-posts-1-item__text a', this).attr('href')
        });
      })
    }
  });
  request({url:'http://news.tut.by', encoding: null}, function(err, res, body) {
    if(err) {
      console.log(err);
    }
    else {
      var $ = cheerio.load(body);
      newsTut = [];
      $('.lists__li').each(function(){
        newsTut.push({
          title: $('.lists__li a', this).text(),
          imgSrc: $('.media img', this).attr('src'),
          url:$('.media a', this).attr('href')
        });
      })
    }
  });
};
  requestParser();

require("node-jsx").install({
    harmony: true, 
    extension: ".jsx"
});

var React = require("react"),
    App = React.createFactory(require("../public/javascripts/components/app"));

/* GET home page. */
router.get('/', function(req, res) {
  var markup = React.renderToString(App());  
  requestParser();    
  res.render('index', { 
    title: 'Express',
    markup: markup 
  });
});
router.get('/news', function(req, res) {
  res.send(news);
});
router.get('/newsonliner', function(req, res) {
  res.send(newsOnliner); 
});
router.get('/newstutby', function(req, res) {
	res.send(newsTut);
});

module.exports = router;
