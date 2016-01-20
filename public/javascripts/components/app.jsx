var React = require("react");
var NewsBox = require("./newsbox");

var App = React.createClass({
  render() {
    return (
    <div>
      <NewsBox pollInterval={100} />
    </div>
    );
  }
});

module.exports = App;