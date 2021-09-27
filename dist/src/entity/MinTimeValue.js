"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinTimeValue = void 0;
var typeorm_1 = require("typeorm");
var minTime_1 = require("./minTime");
var stationFromTo_1 = require("./stationFromTo");
var MinTimeValue = /** @class */ (function () {
    function MinTimeValue() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], MinTimeValue.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], MinTimeValue.prototype, "minValue", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return stationFromTo_1.StationFromTo; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", stationFromTo_1.StationFromTo)
    ], MinTimeValue.prototype, "fromTo", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return minTime_1.MinTime; }, function (minTime) { return minTime.minTime; }),
        __metadata("design:type", Array)
    ], MinTimeValue.prototype, "MTValue", void 0);
    MinTimeValue = __decorate([
        (0, typeorm_1.Entity)()
    ], MinTimeValue);
    return MinTimeValue;
}());
exports.MinTimeValue = MinTimeValue;
//# sourceMappingURL=minTimeValue.js.map