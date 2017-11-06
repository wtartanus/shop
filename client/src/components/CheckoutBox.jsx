var React = require("react");

var CheckoutBox = React.createClass({
    render: function() {
        <section>
            <form>
                <label for="name">Name:</label>
                <input id="name" />
                <label for="surename">Surname:</label>
                <input id="surname" />
                <label for="adress">Adress:</label>
                <input id="adress" className="adressInput" />
                <input className="adressInput" />
                <input className="adressInput" />
                <button>Pay</button>
            </form>
        </section>
    }
});

module.exports = CheckoutBox;