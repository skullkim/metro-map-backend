"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("../lib/type/auth");
var auth_2 = require("../lib/validation/auth");
var fail_1 = require("../lib/jsonResponse/fail");
var validateUserInfo = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!(0, auth_2.isValidPassword)(password)) {
        res.status(400);
        return res.json((0, fail_1.jsonErrorResponse)(req, { message: auth_1.ErrorMessage.InvalidPassword }));
    }
    else if (!(0, auth_2.isValidEmail)(email)) {
        res.status(400);
        return res.json((0, fail_1.jsonErrorResponse)(req, { message: auth_1.ErrorMessage.InvalidEmail }));
    }
    next();
};
exports.default = validateUserInfo;
//# sourceMappingURL=validateUserInfo.js.map