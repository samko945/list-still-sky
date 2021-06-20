import "./Register.css";
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

export default function Register(props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirm: "",
		passwordsMatch: false,
	});
	function updateFormData(event) {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	}
	async function submitFormData(event) {
		event.preventDefault();
		if (formData.password === formData.confirm) {
			const response = await fetch("/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: formData.email, password: formData.password }),
			});
			const data = await response.json(response);
			if (data._id) {
				props.setIsLoggedIn(true);
			} else {
				props.setIsLoggedIn(false);
			}
		}
	}
	return (
		<div>
			<h1>Create an Account!</h1>{" "}
			<form onSubmit={submitFormData}>
				<div className="form-item">
					<TextField className="form-input" label="Email" type="email" name="email" value={formData.email} onChange={updateFormData} />
				</div>
				<div className="form-item">
					<TextField className="form-input" label="Password" type="password" name="password" value={formData.password} onChange={updateFormData} />
				</div>
				<div className="form-item">
					<TextField className="form-input" label="Confirm Password" type="password" name="confirm" value={formData.confirm} onChange={updateFormData} />
				</div>
				<div className="form-item">
					<Button className="form-input" type="submit">
						Sign up
					</Button>
				</div>
			</form>
		</div>
	);
}
