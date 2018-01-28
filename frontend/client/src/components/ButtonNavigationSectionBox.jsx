var React = require("react");
var MobileButtonBox = require("./MobileButtonBox.jsx");

var ButtonNaviagtionSectionBox = React.createClass({
    render: function() {
        return (
            <section className="button-navigation-section">
                <MobileButtonBox changeSection={this.props.changeSection} containerClass={"bondage-button"} buttonType={"Bondage"} />
                <MobileButtonBox changeSection={this.props.changeSection} containerClass={"lingerie-button"} buttonType={"Lingerie"} />                
                <MobileButtonBox changeSection={this.props.changeSection} containerClass={"toys-button"} buttonType={"Sex Toys"} />
                <MobileButtonBox changeSection={this.props.changeSection} containerClass={"essentials-button"} buttonType={"Essentials"} />
            </section>
        );
    }
});

module.exports = ButtonNaviagtionSectionBox;