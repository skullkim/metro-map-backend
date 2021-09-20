"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.set('port', process.env.PORT || 8080);
app.get('/', function (req, res, next) {
    console.log(11);
    res.send("hi");
});
app.listen(app.get('port'), function () {
    console.log(app.get('port') + " server start");
});
//# sourceMappingURL=app.js.map