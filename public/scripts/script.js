var NewsBox = React.createClass({
          loadNewsFromServer: function() {
            $.ajax({
              url: this.props.url,
              dataType: 'json',
              cache: false,
              success: function(data) {
                this.setState({data: data});
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
              }.bind(this)
            });
          },
          getInitialState: function() {
            return {data: []};
          },
          componentDidMount: function() {
            this.loadNewsFromServer();
            setInterval(this.loadNewsFromServer, this.props.pollInterval);
          },
          render: function() {

          return (<div className="newsBox"><h1>Свежыя навiны</h1><NewsList data={this.state.data}/><NewsForm /></div>);
        }
});
var NewsList = React.createClass({
        render: function() {
          var newsNodes = this.props.data.map(function(news) {

          return (<div className="newsList"><News title={news.title} key={news.id}  url={news.url} src={news.imgSrc}></News></div>);
          });
          return (<div className="newsList">{newsNodes}</div>)
        }
});
var NewsForm = React.createClass({
        render: function() {
          return(<div className="newsForm">Hello3</div>);
        }
      });
      var News = React.createClass({
        render: function() {

          return(<div clasName="news"><a href={this.props.url}><h2 className="newsTitle">{this.props.title}</h2><img src={this.props.src}/></a>{this.props.children}</div>);
        }
});

ReactDOM.render(<NewsBox url="/news" pollInterval={2000} />, document.getElementById('content'));
