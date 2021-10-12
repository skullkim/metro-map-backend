"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = void 0;
var isValidPassword = function (password) {
    var passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    return passwordRegexp.test(password);
};
exports.isValidPassword = isValidPassword;
//# sourceMappingURL=auth.js.map