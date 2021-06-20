import React, { useState, useEffect } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState();
	// const [user, setUser] = useState();
	function updateIsLoggedIn(value) {
		setIsLoggedIn(value);
	}
	function handleLogout() {
		fetch("/logout");
		setIsLoggedIn(false);
	}
	useEffect(() => {
		async function getUser() {
			const response = await fetch("/user");
			const userData = await response.json(response);
			console.log(userData);
			if (userData.authenticated === false) {
				if (isLoggedIn === true) {
					setIsLoggedIn(false);
				}
			} else {
				setIsLoggedIn(true);
			}
		}
		getUser();
	}, []);
	return (
		<div className="App">
			{!isLoggedIn ? <Register updateIsLoggedIn={updateIsLoggedIn} /> : null}
			{!isLoggedIn ? <Login updateIsLoggedIn={updateIsLoggedIn} /> : null}
			{isLoggedIn ? <Dashboard handleLogout={handleLogout} /> : null}
		</div>
	);
}

export default App;
