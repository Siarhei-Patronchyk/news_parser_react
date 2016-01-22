var React = require("react");
var NewsBox = require("./newsbox");

var App = React.createClass({
  render() {
    return (
    <div>
      <NewsBox />
    </div>
    );
  }
});

module.exports = App;