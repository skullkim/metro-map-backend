"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fail_1 = require("../utils/jsonResponse/fail");
var auth_1 = require("../utils/type/auth");
var auth_2 = require("../utils/validation/auth");
var validateUserComplainContext = function (req, res, next) {
    var _a = req.body, email = _a.email, subwayLine = _a.subwayLine, userComplainContext = _a.userComplainContext;
    if (!email || !(0, auth_2.isValidEmail)(email)) {
        res.status(400);
        return res.json((0, fail_1.jsonErrorResponse)(req, { message: auth_1.ErrorMessage.InvalidEmail }));
    }
    else if (!userComplainContext || userComplainContext.length <= 10) {
        res.status(400);
        return res.json((0, fail_1.jsonErrorResponse)(req, {
            message: auth_1.ErrorMessage.ComplainContextIsTooShort,
        }));
    }
    else if (userComplainContext.length >= 301) {
        res.status(400);
        return res.json((0, fail_1.jsonErrorResponse)(req, {
            message: auth_1.ErrorMessage.ComplainContextIsTooLong,
        }));
    }
    else if (!subwayLine || 10 <= subwayLine || subwayLine <= 0) {
        res.status(400);
        return res.json((0, fail_1.jsonErrorResponse)(req, {
            message: auth_1.ErrorMessage.InvalidSubwayLine,
        }));
    }
    next();
};
exports.default = validateUserComplainContext;
//# sourceMappingURL=validateUserComplainContext.js.map