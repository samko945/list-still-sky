require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");

const app = express();
const sessionStore = new MongoDBStore({
	uri: `mongodb+srv://admin:${process.env.MDB_USER_PW}@cluster0.2rwdu.mongodb.net/firstDB`,
	collection: "sessions",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(`mongodb+srv://admin:${process.env.MDB_USER_PW}@cluster0.2rwdu.mongodb.net/firstDB`, { useNewUrlParser: true, useUnifiedTopology: true });

const User = require("./models/user").User;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/login", function (req, res) {
	passport.authenticate("local")(req, res, function () {
		console.log(req.user, "logged in");
		res.json(req.user);
	});
});

app.post("/register", function (req, res) {
	const newUser = {
		email: req.body.email,
	};
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			res.redirect("/");
		} else {
			console.log("Registered new user.");
			req.login(user, function (err) {
				if (err) {
					console.log(err);
				} else {
					console.log(req.user, "logged in via register");
					res.json(req.user);
				}
			});
		}
	});
});

app.get("/logout", function (req, res) {
	console.log(req.user, "logging out");
	req.logout();
	if (req.user === null) {
		res.json(null);
		console.log("successfully logged out");
	}
});

app.get("/user", function (req, res) {
	console.log(req.user);
	if (req.isAuthenticated()) {
		res.json(req.user);
	} else {
		res.json(null);
	}
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}...`);
});
