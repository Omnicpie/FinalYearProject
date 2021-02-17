import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";

class NavMobile extends Component {
    state = { }

    render() { 
        return (
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand" onClick={this.props.search}><img src="EshopLogo1.png" alt="Eshop Logo" style={{height: "40px"}}></img></Link>
                <div className="navbar-nav ml-auto">
                    <button style={{margin: "10pt"}} className="button" onClick={this.props.toggleMenu}>{this.props.open ? (<FaBars/>) : (<FaTimes/>)}</button>
                </div>
            </div>
        );
    }
}
 
export default NavMobile;