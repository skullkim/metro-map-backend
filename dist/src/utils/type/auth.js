"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessMessage = exports.ErrorMessage = void 0;
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["SameEmail"] = "\uC774\uBBF8 \uC0AC\uC6A9\uC911\uC778 \uC774\uBA54\uC77C \uC785\uB2C8\uB2E4";
    ErrorMessage["InvalidPassword"] = "\uBE44\uBC00\uBC88\uD638\uB294 8\uC790\uB9AC \uC774\uC0C1, \uD2B9\uC218\uBB38\uC790, \uC22B\uC790, \uC54C\uD30C\uBCB3\uC744 \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4";
    ErrorMessage["InvalidEmail"] = "\uC720\uD6A8\uD558\uC9C0 \uC54A\uC740 \uC774\uBA54\uC77C\uC785\uB2C8\uB2E4";
    ErrorMessage["EmailValidationTimeOut"] = "\uC778\uC99D\uBA54\uC77C \uC720\uD6A8\uC2DC\uAC04\uC774 \uC9C0\uB0AC\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC778\uC99D \uC694\uCCAD\uC744 \uD574\uC8FC\uC138\uC694";
    ErrorMessage["EmailAlreadyVerified"] = "\uC774\uBBF8 \uC778\uC99D\uD55C \uC774\uBA54\uC77C \uC785\uB2C8\uB2E4";
    ErrorMessage["DidNotSignUpYet"] = "\uD68C\uC6D0\uAC00\uC785\uC744 \uD558\uC9C0 \uC54A\uC740 \uACC4\uC815\uC785\uB2C8\uB2E4";
    ErrorMessage["WrongPassword"] = "\uBE44\uBC00\uBC88\uD638\uAC00 \uD2C0\uB838\uC2B5\uB2C8\uB2E4";
    ErrorMessage["DidNotVerifyEmailYet"] = "\uC544\uC9C1 \uC774\uBA54\uC77C \uC778\uC99D\uC744 \uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";
    ErrorMessage["TokenAuth"] = "Authentication error";
    ErrorMessage["TokenExpired"] = "token expired";
    ErrorMessage["InvalidToken"] = "invalidToken";
    ErrorMessage["ComplainContextIsTooShort"] = "\uBBFC\uC6D0\uB0B4\uC6A9\uC740 10\uAE00\uC790 \uC774\uC0C1\uC774\uC5EC\uC57C \uD569\uB2C8\uB2E4";
    ErrorMessage["ComplainContextIsTooLong"] = "\uBBFC\uC6D0 \uB0B4\uC6A9\uC740 300\uAE00\uC790 \uC774\uD558\uC5EC\uC57C \uD569\uB2C8\uB2E4";
    ErrorMessage["InvalidSubwayLine"] = "\uC62C\uBC14\uB974\uC9C0 \uC54A\uC740 \uC9C0\uD558\uCCA0 \uB178\uC120\uC785\uB2C8\uB2E4";
})(ErrorMessage = exports.ErrorMessage || (exports.ErrorMessage = {}));
var SuccessMessage;
(function (SuccessMessage) {
    SuccessMessage["VerifyEmail"] = "\uD68C\uC6D0\uAC00\uC785 \uC644\uB8CC\uB97C \uC704\uD574 \uC774\uBA54\uC77C \uC778\uC99D\uC744 \uD574\uC8FC\uC138\uC694";
    SuccessMessage["VerifyEmailComplete"] = "\uD68C\uC6D0\uAC00\uC785 \uC778\uC99D\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4";
    SuccessMessage["RecertificationEmail"] = "\uC778\uC99D\uC774\uBA54\uC77C\uC774 \uC7AC\uBC1C\uC1A1 \uB42C\uC2B5\uB2C8\uB2E4";
})(SuccessMessage = exports.SuccessMessage || (exports.SuccessMessage = {}));
//# sourceMappingURL=auth.js.map