var React = require("react");
var BasketItemBox = require("./BasketItemBox.jsx");

var ItemBox = React.createClass({
    getInitialState: function() {
         return({
             displayItems: [],
             totalCost: 0
         });
    },
    mapPropsToItems: function(items) {
        if (items && items.length) {
            var displayItems = items.map(function createBasketItems(item, index) {
                   return <BasketItemBox item={item} price={item.price} key={index} quantity={false} addToBasket={this.props.addToBasket}/>
            }.bind(this));
            this.setState({displayItems: displayItems});
         } 
    },
    componentWillMount: function() {
        console.log("czemu",this.props);
        this.mapPropsToItems(this.props.items);
    },
    componentWillReceiveProps: function(nextProps) {
        console.log("nextProps: ", nextProps);
        this.mapPropsToItems(nextProps.items);
    },
    render: function() {

        return(
         <section className="basket">
           {this.state.displayItems}
            <nav className="icon-menu">
                <p>£{this.props.totalCost ? this.props.totalCost : ""}</p>
                <span onClick={() => this.props.goToCheckout("Basket")}><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
            </nav>
         </section>
        );
   
    }
});

module.exports = ItemBox;