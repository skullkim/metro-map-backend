"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonErrorResponse = void 0;
var results = [
    {
        status: 400,
        statusText: 'Bad Request',
        description: 'Request query or parameter error'
    },
    {
        status: 401,
        statusText: 'Unauthorized',
        description: 'Authentication error'
    },
    {
        status: 403,
        statusText: 'Forbidden',
        description: 'The request wat forwarded to the server, but declined because of permissions'
    },
];
var jsonErrorResponse = function (req, error, status) {
    if (status === void 0) { status = 400; }
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
        data: '',
        error: error,
    };
};
exports.jsonErrorResponse = jsonErrorResponse;
//# sourceMappingURL=fail.js.map