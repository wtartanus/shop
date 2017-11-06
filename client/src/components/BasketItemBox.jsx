var React = require("react");

var BasketItemBox = React.createClass({
    render: function() {
        return(
            <section className="basket-item-container">
             <div className="items-container">
                <div className="img-container">
                    <img src={this.props.item.url} />
                </div>
                <div className="price-container">
                    <h2>{this.props.item.name}</h2><br/>
                    <p>£{this.props.price}</p><br/>
                    <p>Quantity: {this.props.item.count}</p>
                </div>
             </div>
             <p>{this.props.item.description}</p>
            </section>
        );
    }
});

module.exports = BasketItemBox;