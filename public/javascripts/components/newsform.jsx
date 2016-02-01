var React = require("react");
var News = require("./news");
var Link = require("react-router");

var NewsForm = React.createClass({
        handleClick: function(e) {
          this.props.onNewsSelect(e.target.id);
        },
        render: function() {
          return(
              <nav className="newsForm nav nav-tabs" onClick={this.handleClick}>
                <Link to="/news" className="button" id="/news">Nasha Niva</Link>
                <Link to="/newsOnliner" className="button" id="/newstutby">TUT.by</Link>
                <Link to="/newsTut" className="button" id="/newsonliner">Onliner.by</Link>
              </nav>
          );
        }
});

module.exports = NewsForm;
