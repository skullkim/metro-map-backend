"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_controllers_1 = __importDefault(require("../controllers/path.controllers"));
var validateStation_1 = __importDefault(require("../middleWares/validateStation"));
var router = express_1.default.Router();
router.get('/:pathTarget', validateStation_1.default, path_controllers_1.default.optimizedPath);
router.get('/stopover/:pathTarget', validateStation_1.default, path_controllers_1.default.optimizedPathStopover);
exports.default = router;
//# sourceMappingURL=path.js.map