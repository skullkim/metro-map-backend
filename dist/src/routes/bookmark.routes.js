"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bookmark_controllers_1 = __importDefault(require("../controllers/bookmark.controllers"));
var verifyAccessToken_middleware_1 = __importDefault(require("../middleWares/verifyAccessToken.middleware"));
var router = express_1.default.Router();
router.get('/user/:userId', verifyAccessToken_middleware_1.default, bookmark_controllers_1.default.getUserBookMarks);
exports.default = router;
//# sourceMappingURL=bookmark.routes.js.map