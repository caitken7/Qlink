// Node Dependencies
// ----------------------------------------------------
var express = require("express");

var router = express.Router();

var db = require("../models"); // All Models

// Extracts the sequelize connection from the models object
// var sequelizeConnection = db.sequelize;

// Sync the tables
// sequelizeConnection.sync();

// Routes
// ----------------------------------------------------

// Index Redirect
router.get("/", function(req, res) {
	db.User
		.findAll({
			// include: [db.Customer],
			//    // Here we specify we want to return our burgers in ordered by ascending burger_name
			//    order: [
			//      ["burger_name", "ASC"]
			//    ]
		})
		.then(data => {
			for (var i = 0; i < data.length; i++) {
				console.log("=================");
				console.log(data[0].dataValues);
				console.log("=================");
			}

			var userObject = {
				user: data
			};
			return res.render("index", userObject);
		});
	// .catch(function(err) {
	// 	console.log(err, "this is the error");
	// });
});

//get profiles belonging to a user
router.post("/testing", function(req, res) {
	// db.Connections
	// 	.create({
	// 		sender_id: 4,
	// 		receiver_id: 7
	// 	})
	// 	.then(newConnection => {
	// 		console.log(
	// 			`New connection id: ${newConnection.id}, with sender id: ${newConnection.sender_id} and receiver id: ${newConnection.receiver_id} has been created.`
	// 		);
	// 	});

	console.log(req.body.test);
	res.json(req.body);

	db.Connections
		.create({
			sender_id: req.body.sender_id,
			receiver_id: req.body.receiver_id
		})
		.then(function(data) {
			console.log(
				"+++++++++++++\nsender_id: ",
				data.dataValues.sender_id
			);
			console.log(
				"+++++++++++++\nreceiver_id: ",
				data.dataValues.receiver_id
			);
			// res.status(200);
			// res.json(data.get({ plain: true }));
			// console.log("===========\ndata: ", data);
			// log the result to our terminal/bash window
			// console.log(connection);
			// redirect
			// res.redirect("/");
		});
});

module.exports = router;
