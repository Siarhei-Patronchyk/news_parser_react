var React = require("react");
var NewsBox = require("./newsbox");

var App = React.createClass({
  render() {
    return (
    <div>
      <NewsBox pollInervall={2000}/>
    </div>
    );
  }
});

module.exports = App;