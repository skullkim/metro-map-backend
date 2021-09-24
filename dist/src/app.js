"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
/* eslint-disable */
(0, typeorm_1.createConnection)().then(function (connection) {
    var app = (0, express_1.default)();
    app.set('port', process.env.PORT || 8080);
    app.get('/', function (req, res) {
        res.send('hi');
    });
    app.listen(app.get('port'), function () {
        // eslint-disable-next-line no-console
        console.log(app.get('port') + " server start");
    });
});
//# sourceMappingURL=app.js.map