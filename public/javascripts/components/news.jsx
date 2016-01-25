var React = require("react");

var News = React.createClass({

        render: function() {
          return(
            <div className="news news-item nn-item text-center col-md-4 col-xs-12 col-sm-12">
              <a href={this.props.url}>
                <p className="newsTitle text-justify">
                  {this.props.title}
                  <br>
                    <strong>{this.props.source}</strong>
                  </br>
                </p>
                <img src={this.props.src} className="img-responsive img-thumbnail img-center" />
              </a>
            {this.props.children}
            </div>);
        }
});

module.exports = News;