"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var amenities_controllers_1 = __importDefault(require("../controllers/amenities.controllers"));
var validateUserComplainContext_1 = __importDefault(require("../middleWares/validateUserComplainContext"));
var router = express_1.default.Router();
router.get('/lost-and-found', amenities_controllers_1.default.getLostAndFoundList);
router.get('/store-box', amenities_controllers_1.default.getStoreBoxList);
router.post('/user-complain', validateUserComplainContext_1.default, amenities_controllers_1.default.sendUserComplainEmail);
exports.default = router;
//# sourceMappingURL=amenities.routes.js.map