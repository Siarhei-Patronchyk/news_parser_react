var NewsBox = React.createClass({

          loadNewsFromServer: function() {
            $.ajax({
              url: this.state.url,
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
          handleNewsSelect: function(value) {
            this.setState({url: value.url});
            this.loadNewsFromServer();
          },
          getInitialState: function() {
            return {url: '/news', data: []};
          },
          componentDidMount: function() {           
            this.loadNewsFromServer();
            setInterval(this.loadNewsFromServer, this.props.pollInterval);
          },
          render: function() {

          return (<div className="newsBox container-fluid"><h1>Свежыя навiны</h1><NewsForm onNewsSelect={this.handleNewsSelect}/><NewsList data={this.state.data}/></div>);
        }
});
var NewsList = React.createClass({
        render: function() {
          var newsNodes = this.props.data.map(function(news) {

          return (
            <div class="item container">
              <div className="newsList">
                <News title={news.title} key={news.id} url={news.url} src={news.imgSrc}>
                </News>
              </div>
            </div>
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
var NewsForm = React.createClass({
        getInitialState: function() {
          return {value: ''};
        },
        handleClick: function(e) {
          e.preventDefault();
          this.setState({value: e.target.id});
          this.props.onNewsSelect({url: e.target.id})
        },
        render: function() {
          return(
              <div className="newsForm row" onClick={this.handleClick}>
                <button id="/news">Nasha Niva</button>
                <button id="/newsonliner">Onliner.by</button>
                <button id="/newstutby">TUT.by</button>
              </div>
          );
        }
      });
var News = React.createClass({
        render: function() {

          return(
            <div className="news news-item nn-item text-center col-md-4 col-xs-12 col-sm-12">
              <a href={this.props.url}>
                <p className="newsTitle text-justify">
                  {this.props.title}
                </p>
                <img src={this.props.src} className="img-responsive img-thumbnail img-center" />
              </a>
            {this.props.children}
            </div>);
        }
});

ReactDOM.render(<NewsBox pollInterval={2000} />, document.getElementById('content'));
