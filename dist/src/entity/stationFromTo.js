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
exports.StationFromTo = void 0;
var typeorm_1 = require("typeorm");
var currentSearched_1 = require("./currentSearched");
var StationFromTo = /** @class */ (function () {
    function StationFromTo() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], StationFromTo.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], StationFromTo.prototype, "from", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], StationFromTo.prototype, "to", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return currentSearched_1.CurrentSearched; }, function (currentSearched) { return currentSearched.fromTo; }),
        __metadata("design:type", currentSearched_1.CurrentSearched)
    ], StationFromTo.prototype, "searched", void 0);
    StationFromTo = __decorate([
        (0, typeorm_1.Entity)()
    ], StationFromTo);
    return StationFromTo;
}());
exports.StationFromTo = StationFromTo;
//# sourceMappingURL=stationFromTo.js.map