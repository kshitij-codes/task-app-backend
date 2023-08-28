"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateUser = (req, res, next) => {
    var _a;
    try {
        // get JWT token from request header
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Authentication failed" });
        }
        if (!process.env.JWT_KEY) {
            return res.status(500).json({ error: "JWT_KEY is not defined" });
        }
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
};
exports.default = authenticateUser;
//# sourceMappingURL=auth.middleware.js.map