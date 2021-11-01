"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_controllers_1 = __importDefault(require("../controllers/path.controllers"));
var middleWare_1 = require("./middleWare");
var router = express_1.default.Router();
router.get('/:pathTarget', middleWare_1.validateStation, path_controllers_1.default.optimizedPath);
router.get('/stopover/:pathTarget', middleWare_1.validateStation, path_controllers_1.default.optimizedPathStopover);
exports.default = router;
//# sourceMappingURL=path.js.map