import React from "react";

export default function Dashboard(props) {
	return (
		<div>
			<h1>Welcome </h1>
			<button onClick={props.handleLogout}>Logout</button>
		</div>
	);
}
