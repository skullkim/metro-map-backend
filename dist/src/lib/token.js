"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
var generateAccessToken = function (data) {
    return jsonwebtoken_1.default.sign(data, "" + process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1h',
    });
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=token.js.map