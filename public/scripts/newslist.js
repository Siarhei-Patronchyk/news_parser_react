var NewsList = React.createClass({
        render: function() {
          var newsNodes = this.props.data.map(function(news) {

          return (<div className="newsList"><News title={news.title} key={news.id}  url={news.url} src={news.imgSrc}></News></div>);
          });
          return (<div className="newsList">{newsNodes}</div>)
        }
});

var News = React.createClass({
        render: function() {

          return(<div clasName="news"><a href={this.props.url}><h2 className="newsTitle">{this.props.title}</h2><img src={this.props.src}/></a>{this.props.children}</div>);
        }
});

module.exports = NewsList