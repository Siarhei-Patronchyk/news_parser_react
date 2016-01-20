var React = require("react");
var NewsForm = require("./newsform");
var NewsList = require("./newslist");
var News = require("./news");

var NewsBox = React.createClass({
          loadNewsFromServer: function() {
            $.ajax({
              url: this.state.url,
              dataType: 'json',
              cache: true,
              success: function(data) {
                this.setState({data: data});
              }.bind(this)
//              error: function(xhr, status, err) {
//                console.error(this.props.url, status, err.toString());
//              }.bind(this)
            });
          },
          getInitialState: function() {
            return {url: '/news', data: []};
          },
          componentDidMount: function() {           
            this.loadNewsFromServer();
            setInterval(this.loadNewsFromServer, this.props.pollInterval);
          },
          handleNewsSelect: function(value) {
            debugger;
            this.replaceState({url: value.url});
            this.loadNewsFromServer();
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