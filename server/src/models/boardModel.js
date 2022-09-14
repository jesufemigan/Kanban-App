"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subTaskSchema = new mongoose_1.Schema({
    title: String,
    isCompleted: {
        type: Boolean,
        default: false
    }
});
const taskSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    subtasks: [subTaskSchema],
    status: {
        type: String,
        required: true
    }
});
const columnSchema = new mongoose_1.Schema({
    title: String,
    tasks: {
        type: [taskSchema],
        default: []
    },
});
const boardSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    columns: {
        type: [columnSchema],
        default: []
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('Board', boardSchema);
