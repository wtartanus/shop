var React = require('react');
var NavBox = require("./NavBox.jsx");

var SplashBox = React.createClass({
    render: function() {
        return (
            <section className="splash-box">
                 <NavBox title={this.props.title} />
            </section>
        );
    }
});

module.exports = SplashBox;