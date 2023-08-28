import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
	title: string;
	description: string;
	completed: Boolean;
	createdAt: Date;
	user: Schema.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
