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
exports.MinTimeOtherValues = void 0;
var typeorm_1 = require("typeorm");
var minTimeValue_1 = require("./minTimeValue");
var MinTimeOtherValues = /** @class */ (function (_super) {
    __extends(MinTimeOtherValues, _super);
    function MinTimeOtherValues() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinTimeOtherValues.getMinPathOtherVal = function (id) {
        if (id === void 0) { id = -1; }
        if (id == -1)
            return;
        return this.createQueryBuilder('minTimeOtherValues')
            .innerJoin('minTimeOtherValues.minTimeValue', 'minTimeValue')
            .where('minTimeValue.id = :id', { id: id })
            .getOne();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], MinTimeOtherValues.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], MinTimeOtherValues.prototype, "distance", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], MinTimeOtherValues.prototype, "cost", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return minTimeValue_1.MinTimeValue; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", String)
    ], MinTimeOtherValues.prototype, "minTimeValue", void 0);
    MinTimeOtherValues = __decorate([
        (0, typeorm_1.Entity)()
    ], MinTimeOtherValues);
    return MinTimeOtherValues;
}(typeorm_1.BaseEntity));
exports.MinTimeOtherValues = MinTimeOtherValues;
//# sourceMappingURL=minTimeOtherValues.js.map