var React = require('react');
var SplashBox = require('./SplashBox.jsx');
var NavBox = require("./NavBox.jsx");
var BasketBox = require("./BasketBox.jsx");
var CheckoutBox = require("./CheckoutBox.jsx");
var ItemBox = require("./ItemsBox.jsx");
var ArticleBox = require("./ArticleBox.jsx");
var ButtonNavigationSectionBox = require("./ButtonNavigationSectionBox.jsx");
var IconMenuBox = require("./IconMenuBox.jsx");

var ShopBox = React.createClass({
  getInitialState: function() {
     return {
       user: this.props.currentUser,
       windowWidth: 0,
       title: "Better-Love",
       section: "SplashBox",
       totalCost: 0,
       basket: [],
       bondage: [
        {
          name: "cuffs",
          url: "/cuffs.jpg",
          price: 10,
          count: 0,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          name: "rope",
          url: "/rope.jpg",
          price: 5,
          count: 0,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          name: "Red dress",
          url: "/boots.jpg",
          price: 25,
          count: 0,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
       ]
      }
  },
  componentDidMount: function() {
    this.setState({windowWidth: window.innerWidth});
    console.log("!!!!!!!!!!!!");
    this.getData();
  },
  componentWillMount: function() {
    console.log("@@@@@@@@@@@@");
  },
  sendData: function(url,info) {
   var request = new XMLHttpRequest();
   request.open("POST", url + "/songs");
   request.setRequestHeader("Content-Type", "application/json");
   request.setRequestHeader("Accept", "application/json")
   request.withCredentials = true;
   request.onload = function() {
     if(request.status === 200 ) {

     } 
   }

   request.send( JSON.stringify( info ) );
  },
  getData: function() {
      var request = new XMLHttpRequest();
      console.log("working");
      request.open("GET","/http://localhost:4567/data")
      request.setRequestHeader("Content-Type", "application/json");
      request.onload = function() {
      if(request.status === 200 ) {
        var playlists = JSON.parse(request.responseText);
        console.log("data:", playlists);
      } 
    }
  },
  setTitle: function(title) {
   this.setState({title: title});
  },
  changeSection: function(section) {
   this.setState({section: section});
   this.setTitle(section);
  },
  addToBasket: function(item) {
    this.state.basket.push(item);
    var cost = item.price * item.count;
    cost += this.state.totalCost;
    this.setState({totalCost: cost});
  },
  render: function() {
    if (this.state.windowWidth <= 400) {
        if (this.state.section === "SplashBox") {
          return (
            <div>
               <SplashBox title={this.state.title} />
               <ButtonNavigationSectionBox changeSection={this.changeSection} />
               <ArticleBox />
               <IconMenuBox changeSection={this.changeSection} />
            </div>
          )
        } else if (this.state.section === "Basket") {
           return (
             <section>
               <NavBox title={this.state.title} classStyle="basket-menu"/>
               <BasketBox basket={this.state.basket} goToCheckout={this.changeSection}/>
             </section>
           );
        } else if (this.state.section === "Checkout") {
           return (
             <section>
               <NavBox title={this.state.title} classStyle="checkout" />
               <CheckoutBox totalCost={this.state.totalCost} /> 
             </section>
           )
        } else if (this.state.section === "Bondage") {
          return(
            <section>
             <NavBox title={this.state.title} classStyle="checkout" />
             <ItemBox items={this.state.bondage} addToBasket={this.addToBasket} totalCost={this.state.totalCost} goToCheckout={this.changeSection}/> 
            </section>
          );
        }
    } else {
      return (
        <div className="page-loading" onClick={this.getData()}>
          <span className="loading-spinner">
             <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
          </span>
        </div>
      );
    }
  }
});

module.exports = ShopBox;