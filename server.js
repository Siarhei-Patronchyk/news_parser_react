var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var app = express();
var news;
var newsOnliner;
var newsTut;

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
}

app.get('/news', function (req,res) {
  requestParser();
  res.json(news);
})

app.get('/newsonliner', function (req,res) {
  requestParser();
  res.json(newsOnliner);
})

app.get('/newstutby', function (req,res) {
  requestParser();
  res.json(newsTut);
})

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
