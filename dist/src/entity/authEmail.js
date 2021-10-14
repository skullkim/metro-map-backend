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
exports.AuthEmail = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var AuthEmail = /** @class */ (function (_super) {
    __extends(AuthEmail, _super);
    function AuthEmail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthEmail_1 = AuthEmail;
    AuthEmail.setRandomKey = function (user, randomKey) {
        return this.createQueryBuilder('authEmail')
            .insert()
            .into(AuthEmail_1)
            .values({ user: user, randomKey: randomKey })
            .execute();
    };
    AuthEmail.deleteRandomKey = function (user) {
        return this.createQueryBuilder('authEmail')
            .delete()
            .from(AuthEmail_1)
            .where('user = :user', { user: user })
            .execute();
    };
    var AuthEmail_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], AuthEmail.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
        }),
        __metadata("design:type", String)
    ], AuthEmail.prototype, "randomKey", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_1.User; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_1.User)
    ], AuthEmail.prototype, "user", void 0);
    AuthEmail = AuthEmail_1 = __decorate([
        (0, typeorm_1.Entity)()
    ], AuthEmail);
    return AuthEmail;
}(typeorm_1.BaseEntity));
exports.AuthEmail = AuthEmail;
//# sourceMappingURL=authEmail.js.map