import React, { useState, useEffect } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	function handleLogout() {
		fetch("/logout");
		setIsLoggedIn(false);
	}
	useEffect(() => {
		async function getStatus() {
			const response = await fetch("/user");
			const userData = await response.json(response);
			console.log(userData, isLoggedIn);
			if (userData === null) {
				if (isLoggedIn === true) {
					console.log("setting status to false");
					setIsLoggedIn(false);
				}
			} else {
				if (isLoggedIn === false) {
					console.log("setting status to true");
					setIsLoggedIn(true);
				}
			}
		}
		getStatus();
	}, [isLoggedIn]);
	return (
		<div className="App">
			{!isLoggedIn ? <Register setIsLoggedIn={setIsLoggedIn} /> : null}
			{!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : null}
			{isLoggedIn ? <Dashboard handleLogout={handleLogout} /> : null}
		</div>
	);
}

export default App;
