var React = require("react");

var CheckoutBox = React.createClass({
    render: function() {
      return(
        <section>
            <form>
                <label htmlFor="name">Name:</label>
                <br/>
                <input id="name" />
                <br/>
                <label htmlFor="surename">Surname:</label>
                <br/>
                <input id="surname" />
                <br/>
                <label htmlFor="adress">Adress:</label>
                <br/>
                <input id="adress" className="adressInput" />
                <br/>
                <input className="adressInput" />
                <br/>
                <input className="adressInput" />
                <br/>
                <button>Pay</button>
            </form>
        </section>
      );
    }
});

module.exports = CheckoutBox;