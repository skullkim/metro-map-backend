"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.MinCost = void 0;
var typeorm_1 = require("typeorm");
var minCostValue_1 = require("./minCostValue");
var MinCost = /** @class */ (function (_super) {
    __extends(MinCost, _super);
    function MinCost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinCost.getMinCostPath = function (id) {
        if (id === void 0) { id = -1; }
        if (id == -1)
            return;
        return this.createQueryBuilder('minCost')
            .innerJoin('minCost.minCost', 'minCostValue')
            .where('minCostValue.id = :id', { id: id })
            .getMany();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], MinCost.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], MinCost.prototype, "station", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return minCostValue_1.MinCostValue; }, function (minCostValue) { return minCostValue.MCValue; }),
        __metadata("design:type", minCostValue_1.MinCostValue)
    ], MinCost.prototype, "minCost", void 0);
    MinCost = __decorate([
        (0, typeorm_1.Entity)()
    ], MinCost);
    return MinCost;
}(typeorm_1.BaseEntity));
exports.MinCost = MinCost;
//# sourceMappingURL=minCost.js.map