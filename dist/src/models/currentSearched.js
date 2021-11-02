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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentSearched = void 0;
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var CurrentSearched = /** @class */ (function (_super) {
    __extends(CurrentSearched, _super);
    function CurrentSearched() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CurrentSearched_1 = CurrentSearched;
    CurrentSearched.setSearchHistory = function (from, to, stopover, target, user) {
        return __awaiter(this, void 0, void 0, function () {
            var prevHistory, hasSameHistory, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, CurrentSearched_1.getUserSearchHistory(user.id)];
                    case 1:
                        prevHistory = _a.sent();
                        hasSameHistory = prevHistory.filter(function (_a) {
                            var fStation = _a.from, tStation = _a.to, sStation = _a.stopover, pathTarget = _a.target, userInfo = _a.user;
                            return (from === fStation &&
                                to === tStation &&
                                stopover === sStation &&
                                target === pathTarget &&
                                user.id === userInfo.id);
                        });
                        if (!(prevHistory.length > 6)) return [3 /*break*/, 3];
                        return [4 /*yield*/, CurrentSearched_1.deleteSearchHistory(prevHistory[0].id)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (hasSameHistory.length) {
                            return [2 /*return*/];
                        }
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.createQueryBuilder('currentSearched')
                            .insert()
                            .into(CurrentSearched_1)
                            .values({ from: from, to: to, stopover: stopover, target: target, user: user })
                            .execute()];
                    case 5: return [2 /*return*/, _a.sent()];
                    case 6:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CurrentSearched.getBookMark = function (id) {
        return this.createQueryBuilder('currentSearched')
            .where('currentSearched.id = :id', { id: id })
            .getOne();
    };
    CurrentSearched.checkBookmark = function (id) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var prevBookmark, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, CurrentSearched_1.getBookMark(id)];
                    case 1:
                        prevBookmark = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.bookmark;
                        return [4 /*yield*/, this.createQueryBuilder('currentSearched')
                                .update(CurrentSearched_1)
                                .set({ bookmark: !prevBookmark })
                                .where('id = :id', { id: id })
                                .execute()];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        err_2 = _b.sent();
                        return [2 /*return*/, err_2];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CurrentSearched.getUserSearchHistory = function (userId) {
        return this.createQueryBuilder('currentSearched')
            .innerJoin('currentSearched.user', 'user')
            .where('user.id = :userId', { userId: userId })
            .orderBy('currentSearched.id', 'ASC')
            .getMany();
    };
    CurrentSearched.deleteSearchHistory = function (id) {
        return this.createQueryBuilder('currentSearched')
            .delete()
            .from(CurrentSearched_1)
            .where('id = :id', { id: id })
            .execute();
    };
    var CurrentSearched_1;
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], CurrentSearched.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], CurrentSearched.prototype, "target", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], CurrentSearched.prototype, "from", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: false,
        }),
        __metadata("design:type", String)
    ], CurrentSearched.prototype, "to", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            length: 10,
            nullable: true,
        }),
        __metadata("design:type", String)
    ], CurrentSearched.prototype, "stopover", void 0);
    __decorate([
        (0, typeorm_1.Column)({
            default: false,
        }),
        __metadata("design:type", Boolean)
    ], CurrentSearched.prototype, "bookmark", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_1.User; }, function (user) { return user.targetUser; }),
        __metadata("design:type", user_1.User)
    ], CurrentSearched.prototype, "user", void 0);
    CurrentSearched = CurrentSearched_1 = __decorate([
        (0, typeorm_1.Entity)()
    ], CurrentSearched);
    return CurrentSearched;
}(typeorm_1.BaseEntity));
exports.CurrentSearched = CurrentSearched;
//# sourceMappingURL=currentSearched.js.map