import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FaUserCircle } from "react-icons/fa";
import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import Browse from "./components/Browse";
import SearchResult from "./components/SearchResult";
import NotFound from "./components/NotFound";

class App extends Component {
  	constructor(props) {
    	super(props);
    	this.logOut = this.logOut.bind(this);
    	this.notSearch = this.notSearch.bind(this);
    	this.search = this.search.bind(this);

    	this.state = {
			  currentUser: undefined,
			  search: ""
		};
  	}

  	componentDidMount() {
    	const user = AuthService.getCurrentUser();
		console.log(window.location.href);
		if(window.location.pathname === "/" || window.location.pathname === "/home"){
			this.setState({search: "Search"})
		}
    	if (user) {
      		this.setState({
        		currentUser: user
      		});
    	}
	}

	notSearch(){
		this.setState({search: ""});
	}

	search(){
		this.setState({search: "Search"});
	}

  	logOut() {
		this.setState({search: ""});
		AuthService.logout();
  	}

  	render() {
		const { currentUser } = this.state;

		return (
			<div style={{height: "100vh",display: "flex",flexDirection: "column"}}>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<Link to={"/"} className="navbar-brand" onClick={this.search}><img src="../EshopLogo1.png" alt="Eshop Logo" style={{height: "40px"}}></img></Link>
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={"/browse"} className="nav-link" onClick={this.notSearch}>Browse</Link>
						</li>
					
					</div>

				{currentUser ? (
					<div className="navbar-nav ml-auto">
						<li className="nav-item" style={{display: "flex",justifyContent: "center",flexDirection: "column"}}>
							<Link to={"/profile"} onClick={this.notSearch} style={{display: "flex", color: "#fff"}}><FaUserCircle style={{height: "1.1em", width: "1.1em"}}/></Link>
						</li>
						<li className="nav-item">
							<a href="/login" className="nav-link" onClick={this.logOut}>Logout</a>
						</li>
					</div>
				) : (
					<div className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link to={"/login"} className="nav-link" onClick={this.notSearch}>Login</Link>
						</li>

						<li className="nav-item">
							<Link to={"/register"} className="nav-link" onClick={this.notSearch}>Sign Up</Link>
						</li>
					</div>
				)}
				</nav>
				<div className={this.state.search} style={{display: "flex", flexGrow: "2", justifyContent: "center"}}>
					<Switch>
						<Route exact path={["/", "/home"]} component={Home}/>
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route path="/search" component={SearchResult} />
						<Route exact path="/profile" component={Profile} />
						<Route path="/user" component={BoardUser} />
						<Route path="/browse" component={Browse} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
