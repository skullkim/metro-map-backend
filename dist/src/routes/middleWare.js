"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStation = void 0;
var stationFromTo_1 = require("../entity/stationFromTo");
var fail_1 = require("../lib/jsonResponse/fail");
var validateStation = function (req, res, next) {
    var _a = req.query, from = _a.from, to = _a.to;
    if (!from || !to) {
        var errorMessage = !from ? '출발점이 없습니다' : '도착점이 없습니다';
        return res.json((0, fail_1.jsonErrorResponse)(req, { message: errorMessage }));
    }
    var target = stationFromTo_1.StationFromTo.hasStation(from, to);
    console.log(target);
    next();
};
exports.validateStation = validateStation;
//# sourceMappingURL=middleWare.js.map