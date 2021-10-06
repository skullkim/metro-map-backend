"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDistance = exports.addUnitToMoney = exports.convertSecond = exports.addStringValue = void 0;
var convert_units_1 = __importDefault(require("convert-units"));
var addStringValue = function (otherValue1, otherValue2) {
    if (otherValue1 === void 0) { otherValue1 = ''; }
    if (otherValue2 === void 0) { otherValue2 = ''; }
    return (parseInt(otherValue1) + parseInt(otherValue2)).toString();
};
exports.addStringValue = addStringValue;
var convertSecond = function (second) {
    if (second === void 0) { second = ''; }
    var minute = (0, convert_units_1.default)(parseInt(second)).from('s').to('min');
    var tmpResult = (minute >= 60 ? (0, convert_units_1.default)(minute).from('min').to('h') : minute).toString();
    var isHour = minute >= 60;
    var result = '';
    if (tmpResult.includes('.')) {
        var resultArr = tmpResult.split('.');
        var pointUpper = isHour ? resultArr[0] + '시간' : resultArr[0] + '분';
        var pointBelow = isHour
            ? (0, convert_units_1.default)(Number("0." + resultArr[1]))
                .from('h')
                .to('min')
                .toFixed(0) + "\uBD84"
            : (0, convert_units_1.default)(Number("0." + resultArr[1]))
                .from('min')
                .to('s')
                .toFixed(0) + "\uCD08";
        result = pointUpper + " " + pointBelow;
    }
    else {
        result = isHour ? tmpResult + " \uC2DC\uAC04" : tmpResult + " \uBD84";
    }
    return result;
};
exports.convertSecond = convertSecond;
var addUnitToMoney = function (money) {
    if (money === void 0) { money = ''; }
    return money + '원';
};
exports.addUnitToMoney = addUnitToMoney;
var convertDistance = function (distance) {
    if (distance === void 0) { distance = ''; }
    return distance.length >= 4
        ? (0, convert_units_1.default)(parseInt(distance)).from('m').to('km').toString() + "km"
        : distance + "m";
};
exports.convertDistance = convertDistance;
//# sourceMappingURL=math.js.map