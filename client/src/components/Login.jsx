import "./Register.css";
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

export default function Login(props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	function updateFormData(event) {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	}
	async function submitFormData(event) {
		event.preventDefault();
		const response = await fetch("/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: formData.email, password: formData.password }),
		});
		const data = await response.json(response);
		if (data._id) {
			props.updateIsLoggedIn(true);
		} else {
			props.updateIsLoggedIn(false);
		}
	}
	return (
		<div>
			<h1>Log in</h1>
			<form onSubmit={submitFormData}>
				<div className="form-item">
					<TextField className="form-input" label="Email" type="email" name="email" value={formData.email} onChange={updateFormData} />
				</div>
				<div className="form-item">
					<TextField className="form-input" label="Password" type="password" name="password" value={formData.password} onChange={updateFormData} />
				</div>
				<div className="form-item">
					<Button className="form-input" type="submit">
						Log in
					</Button>
				</div>
			</form>
		</div>
	);
}
