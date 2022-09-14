"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    res.statusCode ? res.statusCode : 500;
    res.json({
        message: err.message,
        stack: err.stack
    });
};
exports.errorHandler = errorHandler;
