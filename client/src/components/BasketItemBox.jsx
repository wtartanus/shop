var React = require("react");

var BasketItemBox = React.createClass({
    getInitialState: function() {
        return({
            idValue: ""
        });
    },
    componentDidMount: function() {
        this.getIdValue();
    },
    getItem: function() {
      var quantity = document.getElementById(this.state.idValue);
      console.log("quantity: ", quantity.value, "id: ", this.state.idValue);
      this.props.item.count = quantity && quantity.value ? parseInt(quantity.value, 10) : 1;
      this.props.addToBasket(this.props.item);
    },
    getIdValue: function() {
       var randomNumber = Math.floor(Math.random()) * Math.random() + Math.random();
       var id = this.props.item.name + randomNumber;
       this.setState({idValue: id});
    },
    render: function() {
        if (this.props.quantity) {
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
        } else {
            return(
                <section className="basket-item-container">
                 <div className="items-container">
                    <div className="img-container">
                        <img src={this.props.item.url} />
                    </div>
                    <div className="price-container">
                        <h2>{this.props.item.name}</h2><br/>
                        <p>£{this.props.price}</p><br/>
                        <p>Quantity:</p><input id={this.state.idValue} className="quantity-item" type="number"/>
                        <button className="add-to-basket" onClick={this.getItem}><i className="fa fa-plus" aria-hidden="true"></i> Add to basket</button>
                    </div>
                 </div>
                 <p>{this.props.item.description}</p>
                </section>
            );
        }
       
    }
});

module.exports = BasketItemBox;