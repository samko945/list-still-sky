require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
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
					res.redirect("/");
				}
			});
		}
	});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
	console.log(`Listening on port ${PORT}...`);
});
