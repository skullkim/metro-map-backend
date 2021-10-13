"use strict";
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
exports.validatePassword = exports.validateStation = void 0;
var fail_1 = require("../lib/jsonResponse/fail");
var auth_1 = require("../lib/type/auth");
var searchPath_1 = require("../lib/type/searchPath");
var auth_2 = require("../lib/validation/auth");
var station_1 = require("../lib/validation/station");
var validateStation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, startStation, arriveStation, stopoverStation, pathTarget, existPathTarget, emptyStation, sameStation, incorrectStationName, existStation, _b, _c, errorMessage, err_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 6, , 7]);
                _a = req.query, startStation = _a.startStation, arriveStation = _a.arriveStation, stopoverStation = _a.stopoverStation;
                pathTarget = req.params.pathTarget;
                existPathTarget = (0, station_1.checkPathTarget)(pathTarget);
                emptyStation = (0, station_1.checkEmpty)(startStation, searchPath_1.StationKr.START_STATION) ||
                    (0, station_1.checkEmpty)(arriveStation, searchPath_1.StationKr.ARRIVE_STATION) ||
                    (0, station_1.checkEmpty)(stopoverStation, searchPath_1.StationKr.STOPOVER_STATION);
                sameStation = (0, station_1.isSameStation)(startStation, arriveStation, searchPath_1.StationKr.START_STATION, searchPath_1.StationKr.ARRIVE_STATION) ||
                    (0, station_1.isSameStation)(startStation, stopoverStation, searchPath_1.StationKr.START_STATION, searchPath_1.StationKr.STOPOVER_STATION) ||
                    (0, station_1.isSameStation)(stopoverStation, arriveStation, searchPath_1.StationKr.STOPOVER_STATION, searchPath_1.StationKr.ARRIVE_STATION);
                incorrectStationName = (0, station_1.involveChar)(startStation, searchPath_1.StationKr.START_STATION) ||
                    (0, station_1.involveChar)(arriveStation, searchPath_1.StationKr.ARRIVE_STATION) ||
                    (0, station_1.involveChar)(stopoverStation, searchPath_1.StationKr.STOPOVER_STATION);
                return [4 /*yield*/, (0, station_1.hasStation)(startStation, searchPath_1.StationKr.START_STATION)];
            case 1:
                _c = (_d.sent());
                if (_c) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, station_1.hasStation)(arriveStation, searchPath_1.StationKr.ARRIVE_STATION)];
            case 2:
                _c = (_d.sent());
                _d.label = 3;
            case 3:
                _b = _c;
                if (_b) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, station_1.hasStation)(stopoverStation, searchPath_1.StationKr.STOPOVER_STATION)];
            case 4:
                _b = (_d.sent());
                _d.label = 5;
            case 5:
                existStation = _b;
                errorMessage = existPathTarget ||
                    emptyStation ||
                    sameStation ||
                    incorrectStationName ||
                    existStation;
                if (errorMessage) {
                    res.status(400);
                    return [2 /*return*/, res.json((0, fail_1.jsonErrorResponse)(req, { message: errorMessage }))];
                }
                next();
                return [3 /*break*/, 7];
            case 6:
                err_1 = _d.sent();
                next(err_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.validateStation = validateStation;
var validatePassword = function (req, res, next) {
    var password = req.body.password;
    if (!(0, auth_2.isValidPassword)(password)) {
        res.status(400);
        return res.json((0, fail_1.jsonErrorResponse)(req, { message: auth_1.ErrorMessage.InvalidPassword }));
    }
    next();
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=middleWare.js.map