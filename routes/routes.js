var React = require('react');
var Route = require('react-router');

/* containers */
var App = require('components/app')
var News = require('componnents/news');

export default (
  <Route path="/" component={App}>
    <Route path="home" component={Home} />
    <Route path="list" component={List} />
    <Route path="news" component={NewsList} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
