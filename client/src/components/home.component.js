import React, { Component } from "react";
import { Redirect } from "react-router";
import Search from "./Search";

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			content: ""
		};
	}
	componentDidMount() {
	}

	render() {
		return (
			<div className="container" style={{display: "flex",justifyContent: "center",margin: "auto", padding: "60px 15px",  background: "var(--background-2)"}}>
				<header className="" style={{width: "100%"}}>
					<Search history={this.props.history} notSearch={this.props.notSearch}/>
				</header>
			</div>
		);
	}
}
