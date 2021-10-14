"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = exports.isValidPassword = void 0;
var isValidPassword = function (password) {
    var passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return passwordRegexp.test(password);
};
exports.isValidPassword = isValidPassword;
var isValidEmail = function (email) {
    var emailRegexp = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]$/i;
    return emailRegexp.test(email);
};
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=auth.js.map