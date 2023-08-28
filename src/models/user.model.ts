import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	fullname: string;
	username: string;
	password: string;
	email: string;
	createdAt: Date;
}

const userSchema = new Schema<IUser>({
	fullname: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
