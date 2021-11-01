"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fail_1 = require("../utils/jsonResponse/fail");
var auth_1 = require("../utils/type/auth");
var auth_2 = require("../utils/validation/auth");
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