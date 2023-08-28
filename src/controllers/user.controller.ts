import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Joi from "joi";

export const registerUser = async (req: Request, res: Response) => {
	const schema = Joi.object({
		fullname: Joi.string().min(3).max(30).required(),
		username: Joi.string().min(3).max(30).required(),
		password: Joi.string().min(6).required(),
		email: Joi.string().email().required(),
	});
	// validate request body
	const { error } = schema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	try {
		const { username, password, fullname, email } = req.body;

		// Check if either the username or email already exists
		const existingUser = await User.findOne({ $or: [{ username }, { email }] });

		if (existingUser) {
			return res
				.status(400)
				.json({ error: "Username or Email already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const newUser = new User({
			fullname,
			username,
			password: hashedPassword,
			email,
		});
		await newUser.save();

		return res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Server error" });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ error: "Invalid Credentials" });
		}

		//Compare the provided password with hashed password
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ error: "Invalid Credentials" });
		}

		if (!process.env.JWT_KEY) {
			return res.status(500).json({ error: "JWT_KEY is not defined" });
		}

		// Generate JWT Token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
			expiresIn: "2h",
		});

		res.json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};
