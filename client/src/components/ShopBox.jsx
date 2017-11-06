var React = require('react');
var SplashBox = require('./SplashBox.jsx');
var NavBox = require("./NavBox.jsx");
var BasketBox = require("./BasketBox.jsx");
var CheckoutBox = require("./CheckoutBox.jsx");

var ShopBox = React.createClass({
  getInitialState: function() {
     return {
       user: this.props.currentUser,
       windowWidth: 0,
       title: "Better-Love",
       section: "SplashBox",
       basket: [
         {
           name: "cuffs",
           url: "/cuffs.jpg",
           price: 10,
           count: 1,
           description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
         },
         {
           name: "rope",
           url: "/rope.jpg",
           price: 5,
           count: 2,
           description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
         },
         {
           name: "Red dress",
           url: "/boots.jpg",
           price: 25,
           count: 1,
           description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
         }
       ]
      }
  },
  componentDidMount: function() {
    this.setState({windowWidth: window.innerWidth});
    console.log("windowWidth: ", this.state.windowWidth);
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
  setTitle: function(title) {
   this.setState({title: title});
  },
  changeSection: function(section) {
   this.setState({section: section});
   this.setTitle(section);
  },
  render: function() {
    if (this.state.windowWidth <= 400) {
        if (this.state.section === "SplashBox") {
          return (
            <div>
               <SplashBox title={this.state.title} />
               <section className="button-navigation-section">
                <div className="button-section bondage-button">
                        <span className="button-heading">Bondage</span>
                </div>
                <div className="button-section lingerie-button">
                        <span className="button-heading">Lingerie</span>
                </div>
                <div className="button-section toys-button">
                        <span className="button-heading">Sex Toys</span>
                </div>
                <div className="button-section essentials-button">
                        <span className="button-heading">Essentials</span>
                </div>
               </section>
               <article className="splash-page-text">
                   <h2>Why use sex toys?</h2>
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                     Luctus accumsan tortor posuere ac ut consequat. At risus viverra adipiscing at in tellus integer. Ante in nibh mauris cursus mattis molestie a. 
                     Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Sodales ut etiam sit amet nisl purus in mollis. Non pulvinar neque laoreet suspendisse interdum consectetur libero. 
                     Ipsum faucibus vitae aliquet nec. Sodales ut eu sem integer vitae justo eget magna. Quis viverra nibh cras pulvinar. Dictum varius duis at consectetur lorem. 
                     Quam pellentesque nec nam aliquam sem et tortor consequat id. Mi quis hendrerit dolor magna. Euismod in pellentesque massa placerat duis. 
                     Cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris. Vitae elementum curabitur vitae nunc sed. Volutpat commodo sed egestas egestas. 
                     Scelerisque eu ultrices vitae auctor eu. Ut tristique et egestas quis ipsum suspendisse. Massa ultricies mi quis hendrerit dolor magna eget. 
                     Malesuada proin libero nunc consequat. At erat pellentesque adipiscing commodo elit. Ornare quam viverra orci sagittis. 
                     Lacus vestibulum sed arcu non odio euismod lacinia at quis. Volutpat est velit egestas dui id ornare. Urna porttitor rhoncus dolor purus non. 
                     Quis commodo odio aenean sed adipiscing diam donec adipiscing. Malesuada proin libero nunc consequat interdum varius sit amet. Viverra nam libero justo laoreet sit. 
                     Id interdum velit laoreet id donec ultrices tincidunt arcu non.</p>
               </article>
               <nav className="icon-menu">
                  <span><i className="fa fa-venus" aria-hidden="true"></i></span>
                  <span><i className="fa fa-mars" aria-hidden="true"></i></span>
                  <span><i className="fa fa-search" aria-hidden="true"></i></span>
                  <span onClick={() => this.changeSection("Basket")}><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
               </nav>
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
               <CheckoutBox /> 
             </section>
           )
        }
    } else {
      return (
        <div className="page-loading">
          <span className="loading-spinner">
             <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
          </span>
        </div>
      );
    }
  }
});

module.exports = ShopBox;