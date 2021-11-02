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
exports.getOptimizedPathWithStopover = exports.getOptimizedPath = exports.combineMinPath = exports.combineOtherVal = exports.getMinDistance = exports.getMinTime = exports.getMinCost = void 0;
var minCost_1 = require("../models/minCost");
var minCostOtherValues_1 = require("../models/minCostOtherValues");
var minCostValue_1 = require("../models/minCostValue");
var minPath_1 = require("../models/minPath");
var minPathOtherValues_1 = require("../models/minPathOtherValues");
var minPathValue_1 = require("../models/minPathValue");
var minTime_1 = require("../models/minTime");
var minTimeOtherValues_1 = require("../models/minTimeOtherValues");
var minTimeValue_1 = require("../models/minTimeValue");
var math_1 = require("./math");
var searchPath_1 = require("./type/searchPath");
var getMinCost = function (from, to, hasStopover) {
    if (hasStopover === void 0) { hasStopover = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var minCostVal, minCostPath, minCostOtherVal, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, minCostValue_1.MinCostValue.getMinCostValue(from, to)];
                case 1:
                    minCostVal = _a.sent();
                    return [4 /*yield*/, minCost_1.MinCost.getMinCostPath(minCostVal === null || minCostVal === void 0 ? void 0 : minCostVal.id)];
                case 2:
                    minCostPath = _a.sent();
                    return [4 /*yield*/, minCostOtherValues_1.MinCostOtherValues.getMinCostOtherVal(minCostVal === null || minCostVal === void 0 ? void 0 : minCostVal.id)];
                case 3:
                    minCostOtherVal = _a.sent();
                    return [2 /*return*/, {
                            cost: (0, math_1.addUnitToMoney)(minCostVal === null || minCostVal === void 0 ? void 0 : minCostVal.minValue),
                            distance: (0, math_1.convertDistance)(minCostOtherVal === null || minCostOtherVal === void 0 ? void 0 : minCostOtherVal.distance),
                            time: (0, math_1.convertSecond)(minCostOtherVal === null || minCostOtherVal === void 0 ? void 0 : minCostOtherVal.time),
                            path: minCostPath,
                            min_value: !hasStopover ? '' : minCostVal === null || minCostVal === void 0 ? void 0 : minCostVal.minValue,
                            other_value: !hasStopover ? {} : minCostOtherVal,
                        }];
                case 4:
                    err_1 = _a.sent();
                    throw err_1;
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.getMinCost = getMinCost;
var getMinTime = function (from, to, hasStopover) {
    if (hasStopover === void 0) { hasStopover = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var minTimeVal, minTimePath, minTimeOtherVal, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, minTimeValue_1.MinTimeValue.getMinTimeValue(from, to)];
                case 1:
                    minTimeVal = _a.sent();
                    return [4 /*yield*/, minTime_1.MinTime.getMinTimePath(minTimeVal === null || minTimeVal === void 0 ? void 0 : minTimeVal.id)];
                case 2:
                    minTimePath = _a.sent();
                    return [4 /*yield*/, minTimeOtherValues_1.MinTimeOtherValues.getMinPathOtherVal(minTimeVal === null || minTimeVal === void 0 ? void 0 : minTimeVal.id)];
                case 3:
                    minTimeOtherVal = _a.sent();
                    return [2 /*return*/, {
                            cost: (0, math_1.addUnitToMoney)(minTimeOtherVal === null || minTimeOtherVal === void 0 ? void 0 : minTimeOtherVal.cost),
                            distance: (0, math_1.convertDistance)(minTimeOtherVal === null || minTimeOtherVal === void 0 ? void 0 : minTimeOtherVal.distance),
                            time: (0, math_1.convertSecond)(minTimeVal === null || minTimeVal === void 0 ? void 0 : minTimeVal.minValue),
                            path: minTimePath,
                            min_value: !hasStopover ? '' : minTimeVal === null || minTimeVal === void 0 ? void 0 : minTimeVal.minValue,
                            other_value: !hasStopover ? {} : minTimeOtherVal,
                        }];
                case 4:
                    err_2 = _a.sent();
                    throw err_2;
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.getMinTime = getMinTime;
var getMinDistance = function (from, to, hasStopover) {
    if (hasStopover === void 0) { hasStopover = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var minDistanceVal, minDistance, minDistanceOtherVal, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, minPathValue_1.MinPathValue.getMinPathValue(from, to)];
                case 1:
                    minDistanceVal = _a.sent();
                    return [4 /*yield*/, minPath_1.MinPath.getMinPath(minDistanceVal === null || minDistanceVal === void 0 ? void 0 : minDistanceVal.id)];
                case 2:
                    minDistance = _a.sent();
                    return [4 /*yield*/, minPathOtherValues_1.MinPathOtherValues.getMinPathOtherVal(minDistanceVal === null || minDistanceVal === void 0 ? void 0 : minDistanceVal.id)];
                case 3:
                    minDistanceOtherVal = _a.sent();
                    return [2 /*return*/, {
                            cost: (0, math_1.addUnitToMoney)(minDistanceOtherVal === null || minDistanceOtherVal === void 0 ? void 0 : minDistanceOtherVal.cost),
                            distance: (0, math_1.convertDistance)(minDistanceVal === null || minDistanceVal === void 0 ? void 0 : minDistanceVal.minValue),
                            time: (0, math_1.convertSecond)(minDistanceOtherVal === null || minDistanceOtherVal === void 0 ? void 0 : minDistanceOtherVal.time),
                            path: minDistance,
                            min_value: !hasStopover ? '' : minDistanceVal === null || minDistanceVal === void 0 ? void 0 : minDistanceVal.minValue,
                            other_value: !hasStopover ? {} : minDistanceOtherVal,
                        }];
                case 4:
                    err_3 = _a.sent();
                    throw err_3;
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.getMinDistance = getMinDistance;
var invalidOption = function (err) {
    throw new Error(err);
};
var combineOtherVal = function (pathOtherVal1, pathOtherVal2) {
    var result = {};
    if ((pathOtherVal1 === null || pathOtherVal1 === void 0 ? void 0 : pathOtherVal1.cost) && (pathOtherVal1 === null || pathOtherVal1 === void 0 ? void 0 : pathOtherVal1.cost)) {
        var cost = (0, math_1.addStringValue)(pathOtherVal1 === null || pathOtherVal1 === void 0 ? void 0 : pathOtherVal1.cost, pathOtherVal2 === null || pathOtherVal2 === void 0 ? void 0 : pathOtherVal2.cost);
        result.cost = (0, math_1.addUnitToMoney)(cost);
    }
    if ((pathOtherVal1 === null || pathOtherVal1 === void 0 ? void 0 : pathOtherVal1.time) && (pathOtherVal2 === null || pathOtherVal2 === void 0 ? void 0 : pathOtherVal2.time)) {
        var time = (0, math_1.addStringValue)(pathOtherVal1 === null || pathOtherVal1 === void 0 ? void 0 : pathOtherVal1.time, pathOtherVal2 === null || pathOtherVal2 === void 0 ? void 0 : pathOtherVal2.time);
        result.time = (0, math_1.convertSecond)(time);
    }
    if ((pathOtherVal1 === null || pathOtherVal1 === void 0 ? void 0 : pathOtherVal1.distance) && (pathOtherVal2 === null || pathOtherVal2 === void 0 ? void 0 : pathOtherVal2.distance)) {
        var distance = (0, math_1.addStringValue)(pathOtherVal1 === null || pathOtherVal1 === void 0 ? void 0 : pathOtherVal1.distance, pathOtherVal2.distance);
        result.distance = (0, math_1.convertDistance)(distance);
    }
    return result;
};
exports.combineOtherVal = combineOtherVal;
var combineMinPath = function (path1, path2, pathTarget) {
    var _a;
    var result = {};
    var minValue = (0, math_1.addStringValue)(path1 === null || path1 === void 0 ? void 0 : path1.min_value, path2 === null || path2 === void 0 ? void 0 : path2.min_value);
    result.path = (path1 === null || path1 === void 0 ? void 0 : path1.path).concat((_a = path2 === null || path2 === void 0 ? void 0 : path2.path) !== null && _a !== void 0 ? _a : []);
    result = __assign(__assign({}, result), (0, exports.combineOtherVal)(path1 === null || path1 === void 0 ? void 0 : path1.other_value, path2 === null || path2 === void 0 ? void 0 : path2.other_value));
    switch (pathTarget) {
        case searchPath_1.PathTarget.COST:
            result.cost = (0, math_1.addUnitToMoney)(minValue);
            break;
        case searchPath_1.PathTarget.TIME:
            result.time = (0, math_1.convertSecond)(minValue);
            break;
        case searchPath_1.PathTarget.DISTANCE:
            result.distance = (0, math_1.convertDistance)(minValue);
            break;
        default:
            return invalidOption('no target');
    }
    return result;
};
exports.combineMinPath = combineMinPath;
var getOptimizedPath = function (startStation, arriveStation, target) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                _a = target;
                switch (_a) {
                    case searchPath_1.PathTarget.COST: return [3 /*break*/, 1];
                    case searchPath_1.PathTarget.TIME: return [3 /*break*/, 3];
                    case searchPath_1.PathTarget.DISTANCE: return [3 /*break*/, 5];
                }
                return [3 /*break*/, 7];
            case 1: return [4 /*yield*/, (0, exports.getMinCost)(startStation, arriveStation)];
            case 2: return [2 /*return*/, _b.sent()];
            case 3: return [4 /*yield*/, (0, exports.getMinTime)(startStation, arriveStation)];
            case 4: return [2 /*return*/, _b.sent()];
            case 5: return [4 /*yield*/, (0, exports.getMinDistance)(startStation, arriveStation)];
            case 6: return [2 /*return*/, _b.sent()];
            case 7: return [2 /*return*/, invalidOption('no target')];
            case 8: return [3 /*break*/, 10];
            case 9:
                err_4 = _b.sent();
                throw err_4;
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.getOptimizedPath = getOptimizedPath;
var getOptimizedPathWithStopover = function (startStation, stopoverStation, arriveStation, target) { return __awaiter(void 0, void 0, void 0, function () {
    var fromStopover, stopOverTo_1, _a, _b, _c, _d, _e, _f, _g, err_5;
    var _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _l.trys.push([0, 12, , 13]);
                fromStopover = {};
                stopOverTo_1 = {};
                _a = target;
                switch (_a) {
                    case searchPath_1.PathTarget.COST: return [3 /*break*/, 1];
                    case searchPath_1.PathTarget.TIME: return [3 /*break*/, 4];
                    case searchPath_1.PathTarget.DISTANCE: return [3 /*break*/, 7];
                }
                return [3 /*break*/, 10];
            case 1:
                _b = [{}];
                return [4 /*yield*/, (0, exports.getMinCost)(startStation, stopoverStation, true)];
            case 2:
                fromStopover = __assign.apply(void 0, _b.concat([(_l.sent())]));
                _c = [{}];
                return [4 /*yield*/, (0, exports.getMinCost)(stopoverStation, arriveStation, true)];
            case 3:
                stopOverTo_1 = __assign.apply(void 0, _c.concat([(_l.sent())]));
                stopOverTo_1.path = (_h = stopOverTo_1.path) === null || _h === void 0 ? void 0 : _h.filter(function (_a) {
                    var station = _a.station;
                    return station !== stopOverTo_1.path[0].station;
                });
                return [2 /*return*/, (0, exports.combineMinPath)(fromStopover, stopOverTo_1, searchPath_1.PathTarget.COST)];
            case 4:
                _d = [{}];
                return [4 /*yield*/, (0, exports.getMinTime)(startStation, stopoverStation, true)];
            case 5:
                fromStopover = __assign.apply(void 0, _d.concat([(_l.sent())]));
                _e = [{}];
                return [4 /*yield*/, (0, exports.getMinTime)(stopoverStation, arriveStation, true)];
            case 6:
                stopOverTo_1 = __assign.apply(void 0, _e.concat([(_l.sent())]));
                stopOverTo_1.path = (_j = stopOverTo_1.path) === null || _j === void 0 ? void 0 : _j.filter(function (_a) {
                    var station = _a.station;
                    return station !== stopOverTo_1.path[0].station;
                });
                return [2 /*return*/, (0, exports.combineMinPath)(fromStopover, stopOverTo_1, searchPath_1.PathTarget.TIME)];
            case 7:
                _f = [{}];
                return [4 /*yield*/, (0, exports.getMinDistance)(startStation, stopoverStation, true)];
            case 8:
                fromStopover = __assign.apply(void 0, _f.concat([(_l.sent())]));
                _g = [{}];
                return [4 /*yield*/, (0, exports.getMinDistance)(stopoverStation, arriveStation, true)];
            case 9:
                stopOverTo_1 = __assign.apply(void 0, _g.concat([(_l.sent())]));
                stopOverTo_1.path = (_k = stopOverTo_1.path) === null || _k === void 0 ? void 0 : _k.filter(function (_a) {
                    var station = _a.station;
                    return station !== stopOverTo_1.path[0].station;
                });
                return [2 /*return*/, (0, exports.combineMinPath)(fromStopover, stopOverTo_1, searchPath_1.PathTarget.DISTANCE)];
            case 10: return [2 /*return*/, invalidOption('no target')];
            case 11: return [3 /*break*/, 13];
            case 12:
                err_5 = _l.sent();
                throw err_5;
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.getOptimizedPathWithStopover = getOptimizedPathWithStopover;
//# sourceMappingURL=optimizedPath.js.map