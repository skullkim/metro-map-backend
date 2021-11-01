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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passport_1 = __importDefault(require("passport"));
var authEmail_1 = require("../entity/authEmail");
var token_1 = require("../entity/token");
var user_1 = require("../entity/user");
var emailAuth_1 = __importDefault(require("../lib/emailAuth"));
var fail_1 = require("../lib/jsonResponse/fail");
var success_1 = require("../lib/jsonResponse/success");
var token_2 = require("../lib/token");
var auth_1 = require("../lib/type/auth");
var signup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, exUser, bcryptPassword, newUser, _b, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, user_1.User.getUser(email)];
            case 1:
                exUser = _c.sent();
                if (exUser) {
                    res.status(400);
                    return [2 /*return*/, res.json((0, fail_1.jsonErrorResponse)(req, { message: "" + auth_1.ErrorMessage.SameEmail }))];
                }
                return [4 /*yield*/, bcrypt_1.default.hash(password, 12)];
            case 2:
                bcryptPassword = _c.sent();
                return [4 /*yield*/, user_1.User.createUser(email, bcryptPassword)];
            case 3:
                newUser = _c.sent();
                _b = emailAuth_1.default;
                return [4 /*yield*/, user_1.User.getUser(email)];
            case 4: return [4 /*yield*/, _b.apply(void 0, [_c.sent()])];
            case 5:
                _c.sent();
                if (newUser) {
                    res.status(201);
                    return [2 /*return*/, res.json((0, success_1.jsonResponse)(req, { message: "" + auth_1.SuccessMessage.VerifyEmail }, 201))];
                }
                return [3 /*break*/, 7];
            case 6:
                err_1 = _c.sent();
                next(err_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var verifySignupEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, key, id, randomKey, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.query, key = _a.key, id = _a.id;
                return [4 /*yield*/, authEmail_1.AuthEmail.isValidKey(key, Number(id))];
            case 1:
                randomKey = _b.sent();
                if (!randomKey) {
                    res.status(403);
                    return [2 /*return*/, res.json((0, fail_1.jsonErrorResponse)(req, { message: "" + auth_1.ErrorMessage.EmailValidationTimeOut }, 403))];
                }
                return [4 /*yield*/, user_1.User.userCheckedEmail(Number(id))];
            case 2:
                _b.sent();
                return [4 /*yield*/, authEmail_1.AuthEmail.deleteRandomKey(randomKey.id)];
            case 3:
                _b.sent();
                res.status(200);
                res.json((0, success_1.jsonResponse)(req, { message: "" + auth_1.SuccessMessage.VerifyEmailComplete }));
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                next(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var resendSignupEmail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var exUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                exUser = res.locals.exUser;
                return [4 /*yield*/, (0, emailAuth_1.default)(exUser)];
            case 1:
                _a.sent();
                res.status(200);
                res.json((0, success_1.jsonResponse)(req, { message: auth_1.SuccessMessage.RecertificationEmail }));
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var signin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        passport_1.default.authenticate('local', { session: false }, function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                var status_1 = info.message === auth_1.ErrorMessage.DidNotVerifyEmailYet ? 401 : 400;
                res.status(status_1);
                return res.json((0, fail_1.jsonErrorResponse)(req, info, status_1));
            }
            req.login(user, { session: false }, function (loginError) { return __awaiter(void 0, void 0, void 0, function () {
                var id, email, tokenData, accessToken, refreshToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (loginError) {
                                next(loginError);
                            }
                            id = user.id, email = user.email;
                            tokenData = { id: id, email: email };
                            accessToken = (0, token_2.generateAccessToken)(tokenData);
                            refreshToken = jsonwebtoken_1.default.sign(tokenData, "" + process.env.JWT_REFRESH_SECRET);
                            return [4 /*yield*/, token_1.Token.setRefreshToken(user, refreshToken)];
                        case 1:
                            _a.sent();
                            res.cookie("" + process.env.JWT_REFRESH_TOKEN, refreshToken, {
                                httpOnly: true,
                                sameSite: 'none',
                                secure: true,
                            });
                            res.json((0, success_1.jsonResponse)(req, { user_id: user.id, accessToken: accessToken }));
                            return [2 /*return*/];
                    }
                });
            }); });
        })(req, res, next);
        return [2 /*return*/];
    });
}); };
var logout = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                req.logOut();
                res.clearCookie("" + process.env.JWT_REFRESH_TOKEN);
                return [4 /*yield*/, token_1.Token.deleteRefreshToken(req.cookies["" + process.env.JWT_REFRESH_TOKEN])];
            case 1:
                _a.sent();
                res.status(204);
                res.json((0, success_1.jsonResponse)(req, {}, 204));
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                next(err_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var generateRefreshToken = function (req, res) {
    var refreshToken = res.locals.refreshToken;
    jsonwebtoken_1.default.verify(refreshToken, "" + process.env.JWT_REFRESH_SECRET, function (err, user) {
        var _a = user, iat = _a.iat, userInfo = __rest(_a, ["iat"]);
        if (err) {
            res.status(403);
            return res.json((0, fail_1.jsonErrorResponse)(req, { message: 'token expired' }, 403));
        }
        var accessToken = (0, token_2.generateAccessToken)(userInfo);
        res.status(201);
        res.json((0, success_1.jsonResponse)(req, { accessToken: accessToken }, 201));
    });
};
exports.default = {
    signup: signup,
    verifySignupEmail: verifySignupEmail,
    resendSignupEmail: resendSignupEmail,
    signin: signin,
    logout: logout,
    generateRefreshToken: generateRefreshToken,
};
//# sourceMappingURL=auth.controllers.js.map