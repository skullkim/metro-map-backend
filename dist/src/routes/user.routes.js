"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controllers_1 = __importDefault(require("../controllers/user.controllers"));
var verifyAccessToken_middleware_1 = __importDefault(require("../middleWares/verifyAccessToken.middleware"));
var router = express_1.default.Router();
router.get('/user/:userId', verifyAccessToken_middleware_1.default, user_controllers_1.default.getUserSearchHistories);
router.get('/a', function (req, res, next) {
    var _a;
    var authorization = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ');
    res.send(!!(authorization && !authorization[0]));
});
exports.default = router;
//# sourceMappingURL=user.routes.js.map