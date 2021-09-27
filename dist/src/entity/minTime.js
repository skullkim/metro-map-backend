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
exports.MinTime = void 0;
var typeorm_1 = require("typeorm");
var minTimeValue_1 = require("./minTimeValue");
var MinTime = /** @class */ (function () {
    function MinTime() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], MinTime.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], MinTime.prototype, "station", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return minTimeValue_1.MinTimeValue; }, function (minTimeValue) { return minTimeValue.MTValue; }),
        __metadata("design:type", minTimeValue_1.MinTimeValue)
    ], MinTime.prototype, "minTime", void 0);
    MinTime = __decorate([
        (0, typeorm_1.Entity)()
    ], MinTime);
    return MinTime;
}());
exports.MinTime = MinTime;
//# sourceMappingURL=minTime.js.map