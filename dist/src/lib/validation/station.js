"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameStation = exports.isStationExist = exports.checkEmpty = exports.StationKr = void 0;
var StationKr;
(function (StationKr) {
    StationKr["FROM"] = "\uCD9C\uBC1C\uC810";
    StationKr["STOPOVER"] = "\uACBD\uC720\uC9C0";
    StationKr["TO"] = "\uB3C4\uCC29\uC9C0";
})(StationKr = exports.StationKr || (exports.StationKr = {}));
var checkEmpty = function (station, stationName) {
    if (!station)
        return stationName + "\uC774(\uAC00) \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4";
    return '';
};
exports.checkEmpty = checkEmpty;
var isStationExist = function (station, stationName) {
    var numRegx = /^[0-9]*$/;
    if (station.length >= 5 || !station.match(numRegx))
        return "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 " + stationName + " \uC785\uB2C8\uB2E4";
    return '';
};
exports.isStationExist = isStationExist;
var isSameStation = function (station1, station2, stationName1, stationName2) {
    return station1 == station2 ? stationName1 + " \uC640 " + stationName2 + "\uAC00 \uAC19\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4" : '';
};
exports.isSameStation = isSameStation;
//# sourceMappingURL=station.js.map