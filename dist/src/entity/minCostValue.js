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
exports.MinCostValue = void 0;
var typeorm_1 = require("typeorm");
var minCost_1 = require("./minCost");
var stationFromTo_1 = require("./stationFromTo");
var MinCostValue = /** @class */ (function () {
    function MinCostValue() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], MinCostValue.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], MinCostValue.prototype, "minValue", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return stationFromTo_1.StationFromTo; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", stationFromTo_1.StationFromTo)
    ], MinCostValue.prototype, "fromTo", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return minCost_1.MinCost; }, function (minCost) { return minCost.minCost; }),
        __metadata("design:type", Array)
    ], MinCostValue.prototype, "MCValue", void 0);
    MinCostValue = __decorate([
        (0, typeorm_1.Entity)()
    ], MinCostValue);
    return MinCostValue;
}());
exports.MinCostValue = MinCostValue;
//# sourceMappingURL=minCostValue.js.map