import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

class NavMobile extends Component {
    state = { }
    
    render() { 
        return (
            <div> 
                <div className={this.props.open ? "closed" : "open"} id="myNavbar">
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link" onClick={this.props.search}>Home</Link>
                        </li>
                    </div>
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
                        <div className="navbar-nav bottom">
                            <li className="nav-item" style={{display: "flex",justifyContent: "center",flexDirection: "column"}}>
                                <Link to={"/profile"} onClick={this.props.notSearch} style={{display: "flex", color: "var(--text-1)", justifyContent: "center"}}><FaUserCircle className="profile" style={{height: "1.6em", width: "1.6em"}}/></Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.props.logOut}>Logout</a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav bottom">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link" onClick={this.props.notSearch}>Login</Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link" onClick={this.props.notSearch}>Sign Up</Link>
                            </li>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
 
export default NavMobile;