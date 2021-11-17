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
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_1 = require("../models/user");
var fail_1 = require("../utils/jsonResponse/fail");
var auth_1 = require("../utils/type/auth");
var auth_2 = require("../utils/validation/auth");
var validateChangeUserInformationMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, prevPassword, newPassword, userEmail, hasSameEmail, exUser, isValidPrevPassword, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, email = _a.email, prevPassword = _a.prevPassword, newPassword = _a.newPassword;
                userEmail = res.locals.userData.email;
                if (!email) return [3 /*break*/, 2];
                return [4 /*yield*/, user_1.User.getUser(email)];
            case 1:
                hasSameEmail = _b.sent();
                if (hasSameEmail) {
                    res.status(400);
                    return [2 /*return*/, res.json((0, fail_1.jsonErrorResponse)(req, { message: auth_1.ErrorMessage.SameEmail }))];
                }
                if (!(0, auth_2.isValidEmail)(email)) {
                    res.status(400);
                    return [2 /*return*/, res.json((0, fail_1.jsonErrorResponse)(req, { message: auth_1.ErrorMessage.InvalidEmail }))];
                }
                _b.label = 2;
            case 2:
                if (!(prevPassword && newPassword)) return [3 /*break*/, 5];
                return [4 /*yield*/, user_1.User.getUser(userEmail)];
            case 3:
                exUser = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.compare(prevPassword, exUser.password)];
            case 4:
                isValidPrevPassword = _b.sent();
                if (!isValidPrevPassword) {
                    res.status(400);
                    return [2 /*return*/, res.json((0, fail_1.jsonErrorResponse)(req, { message: auth_1.ErrorMessage.InvalidPrevPassword }))];
                }
                if (!(0, auth_2.isValidPassword)(prevPassword)) {
                    res.status(400);
                    return [2 /*return*/, res.json((0, fail_1.jsonErrorResponse)(req, { message: auth_1.ErrorMessage.InvalidPassword }))];
                }
                return [3 /*break*/, 6];
            case 5:
                if ((!prevPassword && newPassword) ||
                    (prevPassword && !newPassword)) {
                    res.status(400);
                    return [2 /*return*/, res.json((0, fail_1.jsonErrorResponse)(req, { message: auth_1.ErrorMessage.CantChangePassword }))];
                }
                _b.label = 6;
            case 6:
                next();
                return [3 /*break*/, 8];
            case 7:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.default = validateChangeUserInformationMiddleware;
//# sourceMappingURL=validateChangeUserInformation.middleware.js.map