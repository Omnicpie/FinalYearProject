import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

class NavPC extends Component {
    state = {  }

    componentDidMount(){
        let x = localStorage.getItem("theme");
		if(x === "light"){
			document.getElementsByClassName("navbar-brand")[0].children[0].src = "eshoplogolight.png"
		}
		else{
			document.getElementsByClassName("navbar-brand")[0].children[0].src = "eshoplogolight.png"
		}
    }

    render() { 
        return ( 
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand" onClick={this.props.search}><img alt="Eshop Logo" style={{height: "40px"}}></img></Link>
                
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/browse"} className="nav-link" onClick={this.props.notSearch}>Browse</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/basket"} className="nav-link" onClick={this.props.notSearch}>Basket Configurator</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link" onClick={this.props.notSearch}>About</Link>
                        </li>
                    </div>
                    {this.props.currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item" style={{display: "flex",justifyContent: "center",flexDirection: "column"}}>
                                <Link to={"/profile"} onClick={this.props.notSearch} style={{display: "flex", color: "var(--text-1)"}}><FaUserCircle className="profile" style={{height: "1.1em", width: "1.1em"}}/></Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.props.logOut}>Logout</a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link" onClick={this.props.notSearch}>Login</Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link" onClick={this.props.notSearch}>Sign Up</Link>
                            </li>
                        </div>
                    )}
                </div>
         );
    }
}
 
export default NavPC;