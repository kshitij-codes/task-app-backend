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
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const joi_1 = __importDefault(require("joi"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        fullname: joi_1.default.string().min(3).max(30).required(),
        username: joi_1.default.string().min(3).max(30).required(),
        password: joi_1.default.string().min(6).required(),
        email: joi_1.default.string().email().required(),
    });
    // validate request body
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const { username, password, fullname, email } = req.body;
        // Check if either the username or email already exists
        const existingUser = yield user_model_1.default.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "Username or Email already exists" });
        }
        // Hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create new user
        const newUser = new user_model_1.default({
            fullname,
            username,
            password: hashedPassword,
            email,
        });
        yield newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield user_model_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        //Compare the provided password with hashed password
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        if (!process.env.JWT_KEY) {
            return res.status(500).json({ error: "JWT_KEY is not defined" });
        }
        // Generate JWT Token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_KEY, {
            expiresIn: "2h",
        });
        res.json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.controller.js.map