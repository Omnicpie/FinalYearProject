import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

class Settings extends Component {
    constructor(props) {
		super(props);

		this.state = {
			redirect: null,
			userReady: false,
			currentUser: { username: "" },
            userInfo: { display_name: "" , email:"" }
		};
	}

    setTheme(e){
        if (e.target.checked === true) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); 
			document.getElementsByClassName("navbar-brand")[0].children[0].src = "https://bestbasket.ddns.net/eshoplogodark.png"
        }
        else{
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); 
			document.getElementsByClassName("navbar-brand")[0].children[0].src = "https://bestbasket.ddns.net/eshoplogolight.png"
        } 
    }

    getDetails(currentUser){
        fetch("https://eshopapi.ddns.net/api/user", {method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}, body: JSON.stringify(currentUser)})
            .then(out => out.json())
            .then(out => this.setState({userInfo: out[0]}));
    }


    formatTime(){
        let time = this.state.userInfo.createdAt;
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        let date = new Date(time);
        return date.toLocaleTimeString(undefined, options);
    }

    componentDidMount(){
		const currentUser = AuthService.getCurrentUser();
        this.getDetails(currentUser);
        const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

        if (currentTheme === 'dark') {
            document.getElementById("checkbox").checked = true;
        }
        
		if (!currentUser) this.setState({ redirect: "/home" });
		
    }

    render() { 
        if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}
        return ( 
            <div>
                <h1>Account Settings</h1>
                <hr/>
                <div style={{textAlign: "center"}}>
                    User Name: {this.state.userInfo.display_name}<br/>
                    Email: {this.state.userInfo.email}<br/>
                    Date Created: {this.formatTime()} 
                </div>
                <div style={{width: "max-content", display: "flex", justifyContent:"center", margin: "auto"}}>
                    <em style={{margin: "auto", marginRight: "10px"}}>Theme (light/dark):</em>
                    <div className="theme-switch-wrapper" style={{width: "max-content"}}>
                        <label className="theme-switch" htmlFor="checkbox">
                            <input type="checkbox" id="checkbox" onChange={this.setTheme}/>
                            <div className="slider round"></div>
                        </label>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Settings;