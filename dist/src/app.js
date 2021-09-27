"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var typeorm_1 = require("typeorm");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
/* eslint-disable */
(0, typeorm_1.createConnection)().then(function (connection) {
    var app = (0, express_1.default)();
    dotenv_1.default.config();
    app.set('port', process.env.PORT || 8080);
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    app.use(function (req, response, next) {
        var error = new Error(req.method + " " + req.originalUrl + " router doesn't exist");
        error.status = 400;
        next(error);
    });
    app.use(function (err, req, res, next) {
        res.locals.message = err.message;
        res.locals.error = process.env.NODE_DEV !== 'production' ? err : {};
        res.send(res.locals.message);
    });
    app.listen(app.get('port'), function () {
        // eslint-disable-next-line no-console
        console.log(app.get('port') + " server start");
    });
});
//# sourceMappingURL=app.js.map