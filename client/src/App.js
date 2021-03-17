import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import MediaQuery from "react-responsive";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import Browse from "./components/Browse";
import SearchResult from "./components/SearchResult";
import NotFound from "./components/NotFound";
import Settings from "./components/Settings";
import NavPC from "./components/NavPC";
import NavMobile from "./components/NavMobile";
import NavMobile2 from "./components/NavMobile2";
import About from "./components/About";
import BasketConfig from "./components/BasketConfig";
import Cookies from "./components/Cookies";
import BasketLoad from "./components/BasketLoad";

class App extends Component {
  	constructor(props) {
    	super(props);
    	this.logOut = this.logOut.bind(this);
    	this.notSearch = this.notSearch.bind(this);
    	this.search = this.search.bind(this);

    	this.state = {
			  currentUser: undefined,
			  search: "",
			  open: true,
			  cookies: "false"
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.getLogo = this.getLogo.bind(this);
		this.hideCookies = this.hideCookies.bind(this);
  	}

  	componentDidMount() {
    	const user = AuthService.getCurrentUser();
		this.getTheme();
		this.getLogo();
		this.getCookies();
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
		if(this.state.open === false){
			this.toggleMenu()
		}
	}

	getTheme(){
		let x = localStorage.getItem("theme");
		if(x === null){
			document.documentElement.setAttribute('data-theme', 'light');
		}
		else{
			document.documentElement.setAttribute('data-theme', x);
		}
	}
	hideCookies(){
		this.setState({cookies: "true"});
		localStorage.setItem("cookies", "true")
	}
	getCookies(){
		let x = localStorage.getItem("cookies");
		if(x === null){
			this.setState({cookies: "false"})
		}
		else{
			this.setState({cookies: x})
		}
	}

	getLogo(){
        let x = localStorage.getItem("theme");
		if(x === "light"){
			document.getElementsByClassName("navbar-brand")[0].children[0].src = "eshoplogolight.png"
		}
		else{
			document.getElementsByClassName("navbar-brand")[0].children[0].src = "eshoplogolight.png"
		}
    }
	
	search(){
		this.setState({search: "Search"});
		if(this.state.open === false){
			this.toggleMenu()
		}
	}

  	logOut() {
		if(this.state.open === false){
			this.toggleMenu()
		}
		this.setState({search: ""});
		AuthService.logout();
  	}

	toggleMenu(){
        if(this.state.open){
            this.setState({open: false})
        }
        else{
            this.setState({open: true})
        }
    }

  	render() {
		const { currentUser } = this.state;
		return (
			<div style={{height: "100vh",display: "flex",flexDirection: "column"}} className={this.state.open ? "" : "hide-content"}>
				<nav className="navbar navbar-expand navcolour">
					<MediaQuery minWidth={1224}>
						<NavPC  currentUser={currentUser} getLogo={this.getLogo} logOut={this.logOut} notSearch={this.notSearch} search={this.search}/>
                    </MediaQuery>
                    <MediaQuery maxWidth={1224}>
                        <NavMobile2 currentUser={currentUser} getLogo={this.getLogo} open={this.state.open} toggleMenu={this.toggleMenu}  notSearch={this.notSearch} search={this.search}/>
                    </MediaQuery>
				</nav>
                <MediaQuery maxWidth={1224}>
                        <NavMobile currentUser={currentUser} open={this.state.open} logOut={this.logOut} notSearch={this.notSearch} search={this.search}/>
                </MediaQuery>
				<div className={this.state.search} style={{display: "flex", flexGrow: "2", justifyContent: "center"}}>
					<Switch>
						<Route exact path={["/", "/home"]} render={props => <Home notSearch={this.notSearch} history={props.history} location={props.location} match={props.match} />}/>
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route path="/search/:term" component={SearchResult} />
						<Route exact path="/profile" component={Profile} />
						<Route exact path="/settings" render={props => <Settings getLogo={this.getLogo}/>}/>
						<Route path="/user" component={BoardUser} />
						<Route path="/browse" component={Browse} />
						<Route path="/about" component={About} />
						<Route path="/basket/:id" component={BasketLoad} />
						<Route path="/basket" component={BasketConfig} />
						<Route path="/cookies" component={Cookies} />
						<Route component={NotFound} />
					</Switch>
				</div>
				{(this.state.cookies === "true")? null : 
					<div style={{position: "fixed", height: "60pt", width: "100%", bottom: "0", zIndex: "9", backgroundColor: "var(--background-2)", display:"flex"}}>
						<div style={{display: "flex", justifyContent: "center", flexDirection:"column"}}>
							<p style={{height:"min-content", marginBottom: "0", marginLeft:"10pt", fontSize: "10pt"}}>By using Best Basket, you accept the use of cookies on this browser.</p>
							<p style={{height:"min-content", marginBottom: "0", marginLeft:"10pt", fontSize: "10pt"}}>You can read more in our <Link to={"/cookies"} className="nav-link" onClick={this.notSearch} style={{display: "inline", padding: "0", textDecoration: "underline"}}>Cookie Policy</Link>.</p>
						</div>
						<div style={{marginLeft: "auto", display: "flex", justifyContent: "center", flexDirection:"column"}}>
							<button className="button b-alt" onClick={this.hideCookies} style={{height:"min-content", marginRight: "10pt"}}>Close</button>
						</div>
					</div>}
			</div>
		);
	}
}

export default App;
