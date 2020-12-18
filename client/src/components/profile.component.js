import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: null,
			userReady: false,
			currentUser: { username: "" },
			savedBaskets: []
		};
	}
	getBaskets(){
		fetch();
	}

	componentDidMount() {
		const currentUser = AuthService.getCurrentUser();

		if (!currentUser) this.setState({ redirect: "/home" });
		this.setState({ currentUser: currentUser, userReady: true })
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		const { currentUser, savedBaskets } = this.state;
		const renderSaved = savedBaskets.map((basket) => {
			return;
			//return <Product key={basket.id} product={basket.name}/>;
		});

		return (
		<div className="container">
			{(this.state.userReady) ?
			<div>
				<header className="jumbotron">
					<h3>
						<strong>{currentUser.display_name}</strong>'s Profile
					</h3>
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
