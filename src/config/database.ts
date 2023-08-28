import mongoose from "mongoose";

const mongoURI: string = process.env.MONGO_URI || "";
console.log({mongoURI})
mongoose
	.connect(mongoURI)
	.then(() => {
		console.log("MongoDB Connected");
	})
	.catch((err) => {
		console.error("MongoDB Connection Error:", err);
	});

export default mongoose;
