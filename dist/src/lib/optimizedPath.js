"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineMinPath = exports.getOptimizedPathWithStopover = exports.getMinDistance = exports.getMinTime = exports.getMinCost = void 0;
var minCost_1 = require("../entity/minCost");
var minCostValue_1 = require("../entity/minCostValue");
var minPath_1 = require("../entity/minPath");
var minPathValue_1 = require("../entity/minPathValue");
var minTime_1 = require("../entity/minTime");
var minTimeValue_1 = require("../entity/minTimeValue");
var getMinCost = function (from, to) { return __awaiter(void 0, void 0, void 0, function () {
    var minCostVal, minCostPath, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, minCostValue_1.MinCostValue.getMinCostValue(from, to)];
            case 1:
                minCostVal = _a.sent();
                return [4 /*yield*/, minCost_1.MinCost.getMinCostPath(minCostVal === null || minCostVal === void 0 ? void 0 : minCostVal.id)];
            case 2:
                minCostPath = _a.sent();
                return [2 /*return*/, {
                        min_value: minCostVal === null || minCostVal === void 0 ? void 0 : minCostVal.minValue,
                        path: minCostPath,
                    }];
            case 3:
                err_1 = _a.sent();
                throw err_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getMinCost = getMinCost;
var getMinTime = function (from, to) { return __awaiter(void 0, void 0, void 0, function () {
    var minTimeVal, minTimePath, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, minTimeValue_1.MinTimeValue.getMinTimeValue(from, to)];
            case 1:
                minTimeVal = _a.sent();
                return [4 /*yield*/, minTime_1.MinTime.getMinTimePath(minTimeVal === null || minTimeVal === void 0 ? void 0 : minTimeVal.id)];
            case 2:
                minTimePath = _a.sent();
                return [2 /*return*/, {
                        min_value: minTimeVal === null || minTimeVal === void 0 ? void 0 : minTimeVal.minValue,
                        path: minTimePath,
                    }];
            case 3:
                err_2 = _a.sent();
                throw err_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getMinTime = getMinTime;
var getMinDistance = function (from, to) { return __awaiter(void 0, void 0, void 0, function () {
    var minDistanceVal, minDistance, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, minPathValue_1.MinPathValue.getMinPathValue(from, to)];
            case 1:
                minDistanceVal = _a.sent();
                return [4 /*yield*/, minPath_1.MinPath.getMinPath(minDistanceVal === null || minDistanceVal === void 0 ? void 0 : minDistanceVal.id)];
            case 2:
                minDistance = _a.sent();
                return [2 /*return*/, {
                        min_value: minDistanceVal === null || minDistanceVal === void 0 ? void 0 : minDistanceVal.minValue,
                        path: minDistance,
                    }];
            case 3:
                err_3 = _a.sent();
                throw err_3;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getMinDistance = getMinDistance;
var getOptimizedPathWithStopover = function (from, stopover, to, target) { return __awaiter(void 0, void 0, void 0, function () {
    var fromStopover, stopOverTo, _a, _b, _c, _d, _e, _f, _g, err_4;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 12, , 13]);
                fromStopover = {};
                stopOverTo = {};
                _a = target;
                switch (_a) {
                    case 'cost': return [3 /*break*/, 1];
                    case 'time': return [3 /*break*/, 4];
                    case 'distance': return [3 /*break*/, 7];
                }
                return [3 /*break*/, 10];
            case 1:
                _b = [{}];
                return [4 /*yield*/, (0, exports.getMinCost)(from, stopover)];
            case 2:
                fromStopover = __assign.apply(void 0, _b.concat([_h.sent()]));
                _c = [{}];
                return [4 /*yield*/, (0, exports.getMinCost)(stopover, to)];
            case 3:
                stopOverTo = __assign.apply(void 0, _c.concat([_h.sent()]));
                return [2 /*return*/, (0, exports.combineMinPath)(fromStopover, stopOverTo)];
            case 4:
                _d = [{}];
                return [4 /*yield*/, (0, exports.getMinTime)(from, stopover)];
            case 5:
                fromStopover = __assign.apply(void 0, _d.concat([_h.sent()]));
                _e = [{}];
                return [4 /*yield*/, (0, exports.getMinTime)(stopover, to)];
            case 6:
                stopOverTo = __assign.apply(void 0, _e.concat([_h.sent()]));
                return [2 /*return*/, (0, exports.combineMinPath)(fromStopover, stopOverTo)];
            case 7:
                _f = [{}];
                return [4 /*yield*/, (0, exports.getMinDistance)(from, stopover)];
            case 8:
                fromStopover = __assign.apply(void 0, _f.concat([_h.sent()]));
                _g = [{}];
                return [4 /*yield*/, (0, exports.getMinDistance)(stopover, to)];
            case 9:
                stopOverTo = __assign.apply(void 0, _g.concat([_h.sent()]));
                return [2 /*return*/, (0, exports.combineMinPath)(fromStopover, stopOverTo)];
            case 10: return [2 /*return*/, new Error('no target')];
            case 11: return [3 /*break*/, 13];
            case 12:
                err_4 = _h.sent();
                throw err_4;
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.getOptimizedPathWithStopover = getOptimizedPathWithStopover;
var combineMinPath = function (path1, path2) {
    var _a, _b, _c;
    var result = {};
    result.min_value = ((+((_a = path1 === null || path1 === void 0 ? void 0 : path1.min_value) !== null && _a !== void 0 ? _a : '1')) + (+((_b = path2 === null || path2 === void 0 ? void 0 : path2.min_value) !== null && _b !== void 0 ? _b : '1'))).toString();
    result.path = (path1 === null || path1 === void 0 ? void 0 : path1.path).concat((_c = path2 === null || path2 === void 0 ? void 0 : path2.path) !== null && _c !== void 0 ? _c : []);
    return result;
};
exports.combineMinPath = combineMinPath;
//# sourceMappingURL=optimizedPath.js.map