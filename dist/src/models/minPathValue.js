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
exports.MinPathValue = void 0;
var typeorm_1 = require("typeorm");
var minPath_1 = require("./minPath");
var stationFromTo_1 = require("./stationFromTo");
var MinPathValue = /** @class */ (function (_super) {
    __extends(MinPathValue, _super);
    function MinPathValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinPathValue.getMinPathValue = function (from, to) {
        return this.createQueryBuilder('minPathValue')
            .innerJoin('minPathValue.fromTo', 'stationFromTo')
            .where('stationFromTo.from = :from', { from: from })
            .andWhere('stationFromTo.to = :to', { to: to })
            .getOne();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], MinPathValue.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], MinPathValue.prototype, "minValue", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return stationFromTo_1.StationFromTo; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", stationFromTo_1.StationFromTo)
    ], MinPathValue.prototype, "fromTo", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return minPath_1.MinPath; }, function (minPath) { return minPath.minPath; }),
        __metadata("design:type", minPath_1.MinPath)
    ], MinPathValue.prototype, "MPValue", void 0);
    MinPathValue = __decorate([
        (0, typeorm_1.Entity)()
    ], MinPathValue);
    return MinPathValue;
}(typeorm_1.BaseEntity));
exports.MinPathValue = MinPathValue;
//# sourceMappingURL=minPathValue.js.map