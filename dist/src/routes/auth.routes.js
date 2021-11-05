"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
var validateEmail_middleware_1 = __importDefault(require("../middleWares/validateEmail.middleware"));
var validateUserInfo_middleware_1 = __importDefault(require("../middleWares/validateUserInfo.middleware"));
var verifyAccessToken_middleware_1 = __importDefault(require("../middleWares/verifyAccessToken.middleware"));
var verifyRefreshToken_middleware_1 = __importDefault(require("../middleWares/verifyRefreshToken.middleware"));
var router = express_1.default.Router();
router.post('/signup', validateUserInfo_middleware_1.default, auth_controllers_1.default.signup);
router.get('/signup/email', auth_controllers_1.default.verifySignupEmail);
router.post('/signup/email/reauthorization', validateEmail_middleware_1.default, auth_controllers_1.default.resendSignupEmail);
router.post('/signin', validateUserInfo_middleware_1.default, auth_controllers_1.default.signin);
router.post('/logout', verifyAccessToken_middleware_1.default, auth_controllers_1.default.logout);
router.post('/refresh-token', verifyRefreshToken_middleware_1.default, auth_controllers_1.default.generateRefreshToken);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map