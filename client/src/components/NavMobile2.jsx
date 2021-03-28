import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";

class NavMobile extends Component {
    state = { }

    componentDidMount(){
        let x = localStorage.getItem("theme");
		if(x === "dark"){
			document.getElementsByClassName("navbar-brand")[0].children[0].src = "eshoplogodark.png"
		}
		else{
			document.getElementsByClassName("navbar-brand")[0].children[0].src = "eshoplogolight.png"
		}
    }

    getIcon(){
        let x = localStorage.getItem("theme");
		if(x === "dark"){
			return "eshoplogodark.png"
		}
		else{
			return "eshoplogolight.png"
		}
    }

    render() { 
        return (
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand" onClick={this.props.search}><img alt="Eshop Logo" src={this.getIcon()} style={{height: "40px"}}></img></Link>
                <div className="navbar-nav ml-auto">
                    <button style={{margin: "10pt"}} className="button" onClick={this.props.toggleMenu}>{this.props.open ? (<FaBars/>) : (<FaTimes/>)}</button>
                </div>
            </div>
        );
    }
}
 
export default NavMobile;