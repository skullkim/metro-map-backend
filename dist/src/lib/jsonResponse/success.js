"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonResponse = void 0;
var results = [
    {
        status: 200,
        statusText: 'OK',
        description: 'Server successfully performs client request',
    },
    {
        status: 201,
        statusText: 'Created',
        description: 'Server successfully generates information from client request',
    },
];
var jsonResponse = function (req, data, status) {
    if (status === void 0) { status = 200; }
    var originalUrl = req.originalUrl, method = req.method, params = req.params, query = req.query;
    var resMessage = results.filter(function (_a) {
        var statusResult = _a.status;
        return statusResult == status;
    });
    return {
        status: status,
        status_code: resMessage[0].statusText,
        request: {
            path: originalUrl,
            method: method,
            params: params,
            query: query,
        },
        data: data,
    };
};
exports.jsonResponse = jsonResponse;
//# sourceMappingURL=success.js.map