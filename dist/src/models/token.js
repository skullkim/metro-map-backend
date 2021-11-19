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
exports.Token = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var Token = /** @class */ (function (_super) {
    __extends(Token, _super);
    function Token() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Token_1 = Token;
    Token.setRefreshToken = function (user, refreshToken) {
        return this.createQueryBuilder('token')
            .insert()
            .into(Token_1)
            .values({ user: user, refreshToken: refreshToken })
            .execute();
    };
    Token.getRefreshToken = function (refreshToken) {
        return this.createQueryBuilder('token')
            .where('Token.refreshToken = :refreshToken', { refreshToken: refreshToken })
            .getOne();
    };
    Token.isRefreshTokenExist = function (userId) {
        return this.createQueryBuilder('token')
            .innerJoin('token.user', 'user')
            .where('user.id = :userId', { userId: userId })
            .getOne();
    };
    Token.deleteRefreshToken = function (refreshToken) {
        return this.createQueryBuilder('token')
            .delete()
            .from(Token_1)
            .where('refreshToken = :refreshToken', { refreshToken: refreshToken })
            .execute();
    };
    var Token_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Token.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            nullable: false,
        }),
        __metadata("design:type", String)
    ], Token.prototype, "refreshToken", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return user_1.User; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", user_1.User)
    ], Token.prototype, "user", void 0);
    Token = Token_1 = __decorate([
        (0, typeorm_1.Entity)()
    ], Token);
    return Token;
}(typeorm_1.BaseEntity));
exports.Token = Token;
//# sourceMappingURL=token.js.map