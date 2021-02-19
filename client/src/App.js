import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
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

class App extends Component {
  	constructor(props) {
    	super(props);
    	this.logOut = this.logOut.bind(this);
    	this.notSearch = this.notSearch.bind(this);
    	this.search = this.search.bind(this);

    	this.state = {
			  currentUser: undefined,
			  search: "",
			  open: true
		};
		this.toggleMenu = this.toggleMenu.bind(this);
		this.getLogo = this.getLogo.bind(this);
  	}

  	componentDidMount() {
    	const user = AuthService.getCurrentUser();
		this.getTheme();
		this.getLogo();
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
						<Route component={NotFound} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
