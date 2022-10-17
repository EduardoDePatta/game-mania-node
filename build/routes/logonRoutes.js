"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class LogonRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post();
    }
}
const logonRoutes = new LogonRoutes();
exports.default = logonRoutes.router;
