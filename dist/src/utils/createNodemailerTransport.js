"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer_1 = __importDefault(require("nodemailer"));
var nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
var createNodemailerTransport = function () {
    return nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
        service: "" + process.env.EMAIL_SERVICE,
        host: "" + process.env.EMAIL_HOST,
        auth: {
            user: "" + process.env.EMAIL,
            pass: "" + process.env.EMAIL_PASSWORD,
        },
    }));
};
exports.default = createNodemailerTransport;
//# sourceMappingURL=createNodemailerTransport.js.map