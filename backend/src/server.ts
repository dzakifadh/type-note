import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
import { MONGO_URL, PORT } from "./utils";

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
