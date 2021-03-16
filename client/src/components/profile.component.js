import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import Basket from "./Basket";

export default class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: null,
			userReady: false,
			currentUser: { username: "" },
			savedBaskets: [],
			loading: true,
			reloading: false
		};
	}
	getBaskets(){
			fetch("https://eshopapi.ddns.net/api/basket/get/all", {method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}, body: JSON.stringify(this.state.currentUser)})
			.then(res=> res.json())
			.then(res => this.setState({ loading:false,reloading:false, savedBaskets: res }));
	}

	componentDidMount() {
		const currentUser = AuthService.getCurrentUser();

		if (!currentUser) this.setState({ redirect: "/home" });
		this.setState({ currentUser: currentUser, userReady: true }, () =>{
			this.getBaskets()
		})
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		const { currentUser, savedBaskets } = this.state;
		const renderSaved = savedBaskets.map((basket) => {
			return <Basket key={basket.value} basket={basket} />
		});

		return (
		<div className="container">
			{(this.state.userReady) ?
			<div>
				<header className="jumbotron">
					<h3>
						<strong>{currentUser.display_name}</strong>'s Profile
					</h3>
					<Link to="/settings" className="button">Edit Settings</Link>
				</header>
				<hr/>
			</div>: null}
			<div>
					<h2>Saved Baskets</h2>
					{renderSaved}
			</div>
		</div>
		);
	}
}
