"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerController_1 = __importDefault(require("../controllers/registerController"));
class RegisterRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', registerController_1.default.logon);
        this.router.get('/', registerController_1.default.list);
        this.router.get('/:id', registerController_1.default.getOne);
        this.router.post('/', registerController_1.default.create);
        this.router.delete('/:id', registerController_1.default.delete);
        this.router.put('/:id', registerController_1.default.update);
    }
}
const registerRoutes = new RegisterRoutes();
exports.default = registerRoutes.router;
