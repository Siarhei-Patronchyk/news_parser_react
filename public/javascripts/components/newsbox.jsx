var React = require("react");
var NewsForm = require("./newsform");
var NewsList = require("./newslist");
var News = require("./news");

var NewsBox = React.createClass({
          loadNewsFromServer: function(url) {
            $.ajax({
              url: url,
              dataType: 'json',
              cache: true,
              success: function(data) {
                this.setState({url: this.state.url, data: data});
              }.bind(this),
              error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
              }.bind(this)
            });
          },
          getInitialState: function() {
            return {url: '/news', data: []};
          },
          componentDidMount: function() { 
            this.loadNewsFromServer(this.state.url);
          },
          handleNewsSelect: function(url) {
            this.loadNewsFromServer(url);
          },
          render: function() {
            return (
              <div className="newsBox container-fluid">
                <h1>Свежыя навiны</h1>
                <NewsForm onNewsSelect={this.handleNewsSelect} />
                <NewsList data={this.state.data} />
              </div>
            );
        }
});

module.exports = NewsBox;