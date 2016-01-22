var React = require("react");
var News = require("./news");

var NewsForm = React.createClass({
        // getInitialState: function() {
        //   return {value: ''};
        // },
        handleClick: function(e) {
          //this.setState({value: e.target.id});
          this.props.onNewsSelect(e.target.id);
        },
        render: function() {
          return(
              <div className="newsForm nav nav-tabs" onClick={this.handleClick}>
                <div className="button" id="/news">Nasha Niva</div>
                <div className="button" id="/newsonliner">Onliner.by</div>
                <div className="button" id="/newstutby">TUT.by</div>
              </div>
          );
        }
});

module.exports = NewsForm;