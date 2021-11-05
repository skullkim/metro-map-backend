"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_controllers_1 = __importDefault(require("../controllers/auth.controllers"));
var validateEmail_1 = __importDefault(require("../middleWares/validateEmail"));
var validateUserInfo_1 = __importDefault(require("../middleWares/validateUserInfo"));
var verifyAccessToken_1 = __importDefault(require("../middleWares/verifyAccessToken"));
var verifyRefreshToken_1 = __importDefault(require("../middleWares/verifyRefreshToken"));
var router = express_1.default.Router();
router.post('/signup', validateUserInfo_1.default, auth_controllers_1.default.signup);
router.get('/signup/email', auth_controllers_1.default.verifySignupEmail);
router.post('/signup/email/reauthorization', validateEmail_1.default, auth_controllers_1.default.resendSignupEmail);
router.post('/signin', validateUserInfo_1.default, auth_controllers_1.default.signin);
router.post('/logout', verifyAccessToken_1.default, auth_controllers_1.default.logout);
router.get('/refresh-token', verifyRefreshToken_1.default, auth_controllers_1.default.generateRefreshToken);
exports.default = router;
//# sourceMappingURL=auth.js.map