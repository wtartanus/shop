var React = require("react");
var BasketItemBox = require("./BasketItemBox.jsx");

var BasketBox = React.createClass({
    getInitialState: function() {
      return({
          basket: []
      });
    },
    getPrice: function(item) {
       return item.price * item.count;
    },
    mapPropsToItems: function(basket) {
        if (basket && basket.length) {
            var basketItems = basket.map(function createBasketItems(item, index) {
                   return <BasketItemBox item={item} price={this.getPrice(item)} key={index} />
            }.bind(this));
            console.log("basketItems", basketItems);
            this.setState({basket: basketItems});
         } else {
             console.log("else");
         }
    },
    componentWillMount: function() {
        this.mapPropsToItems(this.props.basket);
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("nextProps: ", nextProps);
        this.mapPropsToItems(nextProps.basket);
    },
    render: function() {
        return(
            <section className="basket">
                {this.state.basket}
            </section>
        );
    }
});

module.exports = BasketBox;