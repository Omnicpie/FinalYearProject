import React, { Component } from "react";
import UserService from "../services/user.service";
import Search from "./Search";

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: ""
		};
	}

	componentDidMount() {
		UserService.getPublicContent().then(
			response => {
				this.setState({
					content: response.data
				});
			},
			error => {
				this.setState({
					content:
						(error.response && error.response.data) ||
						error.message ||
						error.toString()
				});
			}
		);
	}

	render() {
		return (
			<div className="container" style={{display: "flex",justifyContent: "center",margin: "auto"}}>
				<header className="" style={{width: "100%"}}>
					<Search/>
				</header>
			</div>
		);
	}
}
