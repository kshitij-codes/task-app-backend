import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "./config/database";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";

const app: express.Application = express();
const port: number = 5000;
app.use(cors());

app.use(bodyParser.json());

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
	console.log("Connected successfully");
});
app.get("/", (req: Request, res: Response) => {
	return res.send("Task Management App on Vercel");
});
app.use("/api", taskRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
