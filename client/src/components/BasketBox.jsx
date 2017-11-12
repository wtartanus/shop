var React = require("react");
var BasketItemBox = require("./BasketItemBox.jsx");

var BasketBox = React.createClass({
    getInitialState: function() {
      return({
          basket: [],
          totalCost: 0
      });
    },
    getPrice: function(item) {
        console.log(item);
       return item.price * item.count;
    },
    mapPropsToItems: function(basket) {
        if (basket && basket.length) {
            var cost = 0;
            var basketItems = basket.map(function createBasketItems(item, index) {
                   var itemCost = this.getPrice(item);
                   cost += itemCost;
                   console.log(cost);
                   return <BasketItemBox item={item} price={itemCost} key={index} quantity={true} />
            }.bind(this));
            this.setState({basket: basketItems, totalCost: cost});
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
        if (this.props.basket.length === 0) {
           return(
               <section>
                   <h3 className="epmty-basket">Your basket is empty.</h3>
                   <nav className="icon-menu">
                      <p>£{this.state.totalCost}</p>
                      <span onClick={() => this.props.goToCheckout("Checkout")}><i className="fa fa-credit-card-alt" aria-hidden="true"></i></span>
                    </nav>
               </section>
           );
        } else {
            return(
                <section className="basket">
                    {this.state.basket}
                    <nav className="icon-menu">
                      <p>£{this.state.totalCost}</p>
                      <span onClick={() => this.props.goToCheckout("Checkout")}><i className="fa fa-credit-card-alt" aria-hidden="true"></i></span>
                    </nav>
                </section>
            );
        }
    }
});

module.exports = BasketBox;