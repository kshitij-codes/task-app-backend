"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURI = process.env.MONGO_URI || "";
console.log({ mongoURI });
mongoose_1.default
    .connect(mongoURI)
    .then(() => {
    console.log("MongoDB Connected");
})
    .catch((err) => {
    console.error("MongoDB Connection Error:", err);
});
exports.default = mongoose_1.default;
//# sourceMappingURL=database.js.map