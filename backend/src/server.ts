import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./utils";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World");
});

// Connect to mongoose databse
mongoose
	.connect(MONGO_URL)
	.then(() => {
		console.log("Mongoose Connected!");

		app.listen(PORT, () => {
			console.log(`Server running on port: ${PORT}`);
		});
	})
	.catch(console.error);
