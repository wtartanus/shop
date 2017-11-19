var React = require("react");

var MobileButtonBox = React.createClass({
  render: function() {
      return(
        <div className={this.props.containerClass + " button-section"} onClick={() => this.props.changeSection(this.props.buttonType)}>
           <span className="button-heading">{this.props.buttonType}</span>
        </div>
      );
  }
});

module.exports = MobileButtonBox;