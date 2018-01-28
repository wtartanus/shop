var React = require("react");

var CheckoutBox = React.createClass({
    render: function() {
      return(
        <section>
            <section className="checkout-container">
                <label htmlFor="checkout-name">Name:</label>
                <br/>
                <input id="cehckout-name" className="checkout-input" />
                <br/>
                <label htmlFor="checkout-surename">Surname:</label>
                <br/>
                <input id="checkout-surname" className="checkout-input"/>
                <br/>
                <label htmlFor="adress">Adress:</label>
                <br/>
                <input className="adressInput checkout-input" />
                <br/>
                <input className="adressInput checkout-input" />
                <br/>
                <input className="adressInput checkout-input" />
                <br/>
                <label htmlFor="checkout-creditcard">Card Number:</label>
                <br/>
                <input id="checkout-creditcard" className="checkout-input" />
                <button>Pay {this.props.totalCost ? "£" + this.props.totalCost : ""}</button>
                <img className="checkout-photo" src="/checkout.jpg"></img>
            </section>
        </section>
      );
    }
});

module.exports = CheckoutBox;