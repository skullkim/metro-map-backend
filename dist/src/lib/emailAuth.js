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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var node_cron_1 = __importDefault(require("node-cron"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
var authEmail_1 = require("../entity/authEmail");
dotenv_1.default.config();
var getEmailContext = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var randomString, url, insertId, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                randomString = Math.random().toString(36).substr(2, 11);
                url = process.env.CLIENT_ORIGIN + "/signup/email?key=" + randomString + "&id=" + (user === null || user === void 0 ? void 0 : user.id);
                return [4 /*yield*/, authEmail_1.AuthEmail.setRandomKey(user, randomString)];
            case 1:
                insertId = (_a.sent()).raw.insertId;
                return [2 /*return*/, {
                        emailContext: "\n    <h3>\uC548\uB155\uD558\uC138\uC694 \uD68C\uC6D0\uB2D8. \uD68C\uC6D0\uAC00\uC785 \uC644\uB8CC\uB97C \uC704\uD574 \uB2E4\uC74C \uB9C1\uD06C\uB97C \uD074\uB9AD\uD574 \uC8FC\uC138\uC694</h3>\n    <br />\n    <a \n      style='\n        justify-content: center;\n        align-items: center;\n        text-decoration: none;\n        color: white;\n        background-color: #2867B2;\n        padding: 15px 94px;\n        border: 1px solid #2867B2;\n        border-radius: 15px;\n        font-size: 15px\n      ' \n      href='" + url + "'\n    >\n    \uD68C\uC6D0\uAC00\uC785 \uC644\uB8CC\uD558\uAE30\n    </a>\n  ",
                        authEmailId: insertId,
                    }];
            case 2:
                err_1 = _a.sent();
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
var sendEmailToValidate = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var emailTransport, _a, emailContext, authEmailId_1, mailOption, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                emailTransport = nodemailer_1.default.createTransport((0, nodemailer_smtp_transport_1.default)({
                    service: "" + process.env.EMAIL_SERVICE,
                    host: "" + process.env.EMAIL_HOST,
                    auth: {
                        user: "" + process.env.EMAIL,
                        pass: "" + process.env.EMAIL_PASSWORD,
                    },
                }));
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getEmailContext(user)];
            case 2:
                _a = _b.sent(), emailContext = _a.emailContext, authEmailId_1 = _a.authEmailId;
                mailOption = {
                    from: "" + process.env.EMAIL,
                    to: "" + user.email,
                    subject: '이메일 인증',
                    html: "" + emailContext,
                };
                emailTransport.sendMail(mailOption, function (err, res) {
                    emailTransport.close();
                    node_cron_1.default.schedule('* * 1 * * *', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, authEmail_1.AuthEmail.deleteRandomKey(authEmailId_1)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return err ? err : res;
                });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                return [2 /*return*/, err_2];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = sendEmailToValidate;
//# sourceMappingURL=emailAuth.js.map