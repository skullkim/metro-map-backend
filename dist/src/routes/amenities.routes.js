"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var amenities_controllers_1 = __importDefault(require("../controllers/amenities.controllers"));
var router = express_1.default.Router();
router.get('/lost-and-found', amenities_controllers_1.default.getLostAndFoundList);
exports.default = router;
//# sourceMappingURL=amenities.routes.js.map