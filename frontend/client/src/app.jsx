var React = require('react');
var ReactDom = require('react-dom');
var ShopBox = require('./components/ShopBox.jsx');

window.onload = function() {
  ReactDom.render(<ShopBox />,document.getElementById('app'));
};