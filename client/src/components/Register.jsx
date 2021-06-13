import "./Register.css";
import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

export default function Register() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirm: "",
	});
	function updateFormData(event) {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	}
	function submitFormData(event) {
		event.preventDefault();
		fetch("/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
	}
	return (
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
	);
}
