"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.editTask = exports.getAllTasks = exports.createTask = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const joi_1 = __importDefault(require("joi"));
// Function to handle the POST request for creating a new task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
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
        const newTask = new task_model_1.default(newTaskData);
        // Save the new task to the database
        const savedTask = yield newTask.save();
        res.status(201).json(savedTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while creating task" });
    }
});
exports.createTask = createTask;
// Function to handle the GET request for retrieving all tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // retrieve userId from the autheticated user
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        const tasks = yield task_model_1.default.find({ user: userId });
        res.json(tasks);
    }
    catch (error) {
        return res.status(500).json({ error: "Server error while getting tasks" });
    }
});
exports.getAllTasks = getAllTasks;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        const task = yield task_model_1.default.findById(taskId);
        if (!task) {
            return res
                .status(400)
                .json({ error: "The task with the given ID was not found" });
        }
        const schema = joi_1.default.object({
            title: joi_1.default.string().required(),
            description: joi_1.default.string().required(),
            completed: joi_1.default.boolean().required(),
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
        const updatedTask = yield task.save();
        res.json(updatedTask);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});
exports.editTask = editTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    try {
        const task = yield task_model_1.default.findById(taskId);
        if (!task) {
            return res
                .status(404)
                .json({ error: "The task with the given ID was not found" });
        }
        yield task.deleteOne();
        // Send a "No Content" response after successful deletion
        res.sendStatus(204);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.controller.js.map