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
exports.validateStation = void 0;
var stationFromTo_1 = require("../entity/stationFromTo");
var fail_1 = require("../lib/jsonResponse/fail");
var station_1 = require("../lib/validation/station");
var validateStation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, from, to, stopover, originalUrl, errorMessage, fromTarget, toTarget, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.query, from = _a.from, to = _a.to, stopover = _a.stopover;
                originalUrl = req.originalUrl;
                errorMessage = '';
                errorMessage = (0, station_1.checkEmpty)(from, station_1.StationKr.FROM);
                errorMessage = (0, station_1.checkEmpty)(to, station_1.StationKr.TO);
                if (stopover) {
                    errorMessage = (0, station_1.checkEmpty)(stopover, station_1.StationKr.STOPOVER);
                }
                errorMessage = (0, station_1.isStationExist)(from, station_1.StationKr.FROM);
                errorMessage = (0, station_1.isStationExist)(to, station_1.StationKr.TO);
                if (stopover) {
                    errorMessage = (0, station_1.isStationExist)(stopover, station_1.StationKr.STOPOVER);
                }
                errorMessage = (0, station_1.isSameStation)(from, to, station_1.StationKr.FROM, station_1.StationKr.TO);
                if (stopover) {
                    errorMessage = (0, station_1.isSameStation)(from, stopover, station_1.StationKr.FROM, station_1.StationKr.STOPOVER);
                    errorMessage = (0, station_1.isSameStation)(stopover, to, station_1.StationKr.STOPOVER, station_1.StationKr.TO);
                }
                if (errorMessage) {
                    return [2 /*return*/, res.json((0, fail_1.jsonErrorResponse)(req, { message: errorMessage }))];
                }
                return [4 /*yield*/, stationFromTo_1.StationFromTo.hasStation(from)];
            case 1:
                fromTarget = _b.sent();
                return [4 /*yield*/, stationFromTo_1.StationFromTo.hasStation(to)];
            case 2:
                toTarget = _b.sent();
                if (!fromTarget || !toTarget) {
                    errorMessage = !fromTarget
                        ? '존재하지 않는 출발점입니다'
                        : '존재하지 않는 도착점입니다';
                    return [2 /*return*/, res.json((0, fail_1.jsonErrorResponse)(req, { message: errorMessage }))];
                }
                next();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.validateStation = validateStation;
//# sourceMappingURL=middleWare.js.map