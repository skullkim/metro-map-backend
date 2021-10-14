"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
var math_1 = require("./math");
dotenv_1.default.config();
var emailContext = function () {
    var randomString = Math.random.toString().substr(2, 11);
    var nowTimeAsSecond = (0, math_1.getTimeAsSecond)();
    var url = process.env.CLIENT_ORIGIN + "/authentication/signup?key=" + randomString + "&signupTime=" + nowTimeAsSecond;
    return "\n    <h3>\uC548\uB155\uD558\uC138\uC694 \uD68C\uC6D0\uB2D8. \uD68C\uC6D0\uAC00\uC785 \uC644\uB8CC\uB97C \uC704\uD574 \uB2E4\uC74C \uB9C1\uD06C\uB97C \uD074\uB9AD\uD574 \uC8FC\uC138\uC694</h3>\n    <br />\n    <a \n      style='\n        justify-content: center;\n        align-items: center;\n        text-decoration: none;\n        color: white;\n        background-color: #2867B2;\n        padding: 15px 94px;\n        border: 1px solid #2867B2;\n        border-radius: 15px;\n        font-size: 15px\n      ' \n      href='" + url + "'\n    >\n    \uD68C\uC6D0\uAC00\uC785 \uC644\uB8CC\uD558\uAE30\n    </a>\n  ";
};
var sendEmailToValidate = function (user) {
    var emailTransport = nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
        service: "" + process.env.EMAIL_SERVICE,
        host: "" + process.env.EMAIL_HOST,
        auth: {
            user: "" + process.env.EMAIL,
            pass: "" + process.env.EMAIL_PASSWORD,
        },
    }));
    var mailOption = {
        from: "" + process.env.EMAIL,
        to: "" + user.email,
        subject: '이메일 인증',
        html: "" + emailContext(),
    };
    emailTransport.sendMail(mailOption, function (err, res) {
        emailTransport.close();
        return err ? err : res;
    });
};
exports.default = sendEmailToValidate;
//# sourceMappingURL=emailAuth.js.map