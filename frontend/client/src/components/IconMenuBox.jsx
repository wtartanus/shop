var React = require("react");

var IconMenuBox = React.createClass({
    render: function() {
        return (
          <nav className="icon-menu">
            <span><i className="fa fa-venus" aria-hidden="true"></i></span>
            <span><i className="fa fa-mars" aria-hidden="true"></i></span>
            <span><i className="fa fa-search" aria-hidden="true"></i></span>
            <span onClick={() => this.props.changeSection("Basket")}><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
          </nav>
        );
    }
});

module.exports = IconMenuBox;