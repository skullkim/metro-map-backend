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
exports.hasStation = exports.isSameStation = exports.involveChar = exports.checkEmpty = exports.StationKr = void 0;
var stationFromTo_1 = require("../../entity/stationFromTo");
var StationKr;
(function (StationKr) {
    StationKr["FROM"] = "\uCD9C\uBC1C\uC810";
    StationKr["STOPOVER"] = "\uACBD\uC720\uC9C0";
    StationKr["TO"] = "\uB3C4\uCC29\uC9C0";
})(StationKr = exports.StationKr || (exports.StationKr = {}));
var checkEmpty = function (station, stationName) {
    if (!station && station !== undefined) {
        return stationName + "\uC774(\uAC00) \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4";
    }
    return '';
};
exports.checkEmpty = checkEmpty;
var involveChar = function (station, stationName) {
    if (station === undefined)
        return;
    var numRegx = /^[0-9]*$/;
    if (station.length >= 5 || !station.match(numRegx)) {
        return "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 " + stationName + " \uC785\uB2C8\uB2E4";
    }
    return '';
};
exports.involveChar = involveChar;
var isSameStation = function (station1, station2, stationName1, stationName2) {
    if (station1 === undefined || station2 === undefined)
        return;
    return station1 == station2
        ? stationName1 + " \uC640 " + stationName2 + "\uAC00 \uAC19\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"
        : '';
};
exports.isSameStation = isSameStation;
var hasStation = function (station, stationName) { return __awaiter(void 0, void 0, void 0, function () {
    var target, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (station === undefined)
                    return [2 /*return*/];
                return [4 /*yield*/, stationFromTo_1.StationFromTo.hasStation(station)];
            case 1:
                target = _a.sent();
                return [2 /*return*/, !target ? "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 " + stationName + "\uC785\uB2C8\uB2E4" : ''];
            case 2:
                err_1 = _a.sent();
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.hasStation = hasStation;
//# sourceMappingURL=station.js.map