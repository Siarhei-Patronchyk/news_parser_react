var React = require("react");
var News = require('./news');

var NewsList = React.createClass({
        render: function() {
          var newsNodes = this.props.data.map(function(news) {
            return (
              <News title={news.title} key={news.id} url={news.url} src={news.imgSrc} />
            );
          });
          return (
            <div class="container-fluid">
              <div className="newsList">
                {newsNodes}
              </div>
            </div>
           );
        }
});

module.exports = NewsList;