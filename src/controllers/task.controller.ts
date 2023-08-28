import { Request, Response } from "express";
import Task, { ITask } from "../models/task.model";
import Joi from "joi";

// Function to handle the POST request for creating a new task
export const createTask = async (req: Request, res: Response) => {
	const schema = Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	// retrieve userId from the autheticated user
	const userId = req.userId;

	try {
		const newTaskData = {
			title: req.body.title,
			description: req.body.description,
			user: userId,
		};

		const newTask: ITask = new Task(newTaskData);

		// Save the new task to the database
		const savedTask = await newTask.save();

		res.status(201).json(savedTask);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error while creating task" });
	}
};

// Function to handle the GET request for retrieving all tasks
export const getAllTasks = async (req: Request, res: Response) => {
	try {
		// retrieve userId from the autheticated user
		const userId = req.userId;

		if (!userId) {
			return res.status(401).json({ error: "Authentication failed" });
		}

		const tasks = await Task.find({ user: userId });
		res.json(tasks);
	} catch (error) {
		return res.status(500).json({ error: "Server error while getting tasks" });
	}
};

export const editTask = async (req: Request, res: Response) => {
	const taskId = req.params.id;

	try {
		const task = await Task.findById(taskId);

		if (!task) {
			return res
				.status(400)
				.json({ error: "The task with the given ID was not found" });
		}

		const schema = Joi.object({
			title: Joi.string().required(),
			description: Joi.string().required(),
			completed: Joi.boolean().required(),
		});

		// Validate the request body against the schema
		const { error } = schema.validate(req.body);

		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}

		// Update the task with the provided data
		task.title = req.body.title;
		task.description = req.body.description;
		task.completed = req.body.completed;

		// save the updated task
		const updatedTask = await task.save();

		res.json(updatedTask);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	const taskId = req.params.id;

	try {
		const task = await Task.findById(taskId);

		if (!task) {
			return res
				.status(404)
				.json({ error: "The task with the given ID was not found" });
		}

		await task.deleteOne();

		// Send a "No Content" response after successful deletion
		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server error" });
	}
};
