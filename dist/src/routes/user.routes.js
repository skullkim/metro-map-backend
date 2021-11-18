"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
var validateChangeUserInformation_middleware_1 = __importDefault(require("../middleWares/validateChangeUserInformation.middleware"));
var verifyAccessToken_middleware_1 = __importDefault(require("../middleWares/verifyAccessToken.middleware"));
var router = express_1.default.Router();
router.put('/:userId/user-information', verifyAccessToken_middleware_1.default, validateChangeUserInformation_middleware_1.default, user_controllers_1.default.changeUserInformation);
router.get('/:userId/email', verifyAccessToken_middleware_1.default, user_controllers_1.default.getUserEmail);
exports.default = router;
//# sourceMappingURL=user.routes.js.map