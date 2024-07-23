"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const logger_1 = __importDefault(require("./logger"));
const handleError = (res, err, message = "Internal server error") => {
    logger_1.default.error("This is an error log");
    return res.status(500).json({ error: message });
};
exports.handleError = handleError;
