var React = require("react");

var CheckoutBox = React.createClass({
    render: function() {
      return(
        <section>
            <section className="checkout-container">
                <label htmlFor="name">Name:</label>
                <br/>
                <input id="cehckout-name" className="checkout-input" />
                <br/>
                <label htmlFor="surename">Surname:</label>
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
                <button>Pay {this.props.totalCost ? "£" + this.props.totalCost : ""}</button>
                <img className="checkout-photo" src="/checkout.jpg"></img>
            </section>
        </section>
      );
    }
});

module.exports = CheckoutBox;