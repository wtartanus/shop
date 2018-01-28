var React = require("react");

var NavBox = React.createClass({
    getInitialState: function() {
         return {
             navIsOpen: false
         }
    },
    toogleNav: function() {
        var menuList = document.getElementById("menuList");

        if (this.state.navIsOpen) {
            menuList.classList.remove("menu-list-show");
        } else {
            menuList.classList.add("menu-list-show");
            if (this.props.classStyle) {
                var menuList = document.getElementById("menuList");
                menuList.style.backgroundColor = "red";
            }
        }
        this.setState({navIsOpen: !this.state.navIsOpen});
    },
    componentDidMount: function() {
      if (this.props.classStyle) {
          console.log("poprs: ", this.props);
          var navMenu = document.getElementById("nav-menu");
          navMenu.style.backgroundColor = "red";
      }
    },
    render: function() {
        return(
            <div>
                <nav id="nav-menu" className="nav-box">
                <img className="menu-logo" src="/new-logo.gif" alt="Smiley face" height="42" width="25"></img>
                <span className="menu-name">{this.props.title}</span>
                <span onClick={this.toogleNav} className="menu-icon"><i className="fa fa-bars" aria-hidden="true"></i></span>
                </nav>
                <div id="menuList" className="menu-list">
                    <ul>
                        <li>Bondage</li>
                        <li>Cloths</li>
                        <li>Sex Toys</li>
                        <li>Esentialss</li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = NavBox;