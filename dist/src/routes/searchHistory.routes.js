"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var searchHistory_controllers_1 = __importDefault(require("../controllers/searchHistory.controllers"));
var verifyAccessToken_middleware_1 = __importDefault(require("../middleWares/verifyAccessToken.middleware"));
var router = express_1.default.Router();
router.get('/user/:userId', verifyAccessToken_middleware_1.default, searchHistory_controllers_1.default.getUserSearchHistories);
router.put('/bookmark/:bookmarkId', verifyAccessToken_middleware_1.default, searchHistory_controllers_1.default.setUserPathBookmark);
exports.default = router;
//# sourceMappingURL=searchHistory.routes.js.map