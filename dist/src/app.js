"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var models_1 = require("../models");
var app = (0, express_1.default)();
app.set('port', process.env.PORT || 8080);
models_1.sequelize.sync({ force: false })
    .then(function () { return console.log('success to connect DB'); })
    .catch(function (err) { return console.error(err); });
app.get('/', function (req, res) {
    res.send('hi');
});
app.listen(app.get('port'), function () {
    // eslint-disable-next-line no-console
    console.log(app.get('port') + " server start");
});
//# sourceMappingURL=app.js.map