"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var passport_1 = __importDefault(require("passport"));
var typeorm_1 = require("typeorm");
var passport_2 = __importDefault(require("./config/passport"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var path_routes_1 = __importDefault(require("./routes/path.routes"));
var user_routes_1 = __importDefault(require("./routes/user.routes"));
(0, typeorm_1.createConnection)().then(function () {
    var app = (0, express_1.default)();
    dotenv_1.default.config();
    app.set('port', process.env.PORT || 8080);
    app.use((0, morgan_1.default)('dev'));
    app.use((0, cors_1.default)({
        origin: "" + process.env.CLIENT_ORIGIN,
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    app.use(function (req, res, next) {
        if (req.is('application/vnd.api+json')) {
            res.contentType('application/vnd.api+json');
            res.setHeader('Accept', 'application/json');
        }
        res.setHeader('Allow', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Origin', "" + process.env.CLIENT_ORIGIN);
        res.setHeader('Cache-Control', 'no-store');
        next();
    });
    app.use(passport_1.default.initialize());
    (0, passport_2.default)();
    app.use('/path', path_routes_1.default);
    app.use('/authentication', auth_routes_1.default);
    app.use('/search-history', user_routes_1.default);
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