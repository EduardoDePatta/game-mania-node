"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class RegisterController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const register = yield database_1.default.query("SELECT * FROM register");
            res.json(register);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const register = yield database_1.default.query("SELECT * FROM register WHERE id = ?", [
                id,
            ]);
            if (register.length > 0) {
                return res.json(register[0]);
            }
            res.status(404).json({ text: "The register doesn't exist" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield database_1.default.query("SELECT * FROM register WHERE email = ?", [req.body.email]);
            if (Object.keys(data).length === 0) {
                yield database_1.default.query("INSERT INTO register set ?", [req.body]);
                res.status(200).json({ msg: 'Usuário Registrado' });
            }
            else if (Object.keys(data).length !== 0) {
                res.status(422).json({ error: 'E-mail já cadastrado. Tente Logar.' });
            }
        });
    }
    logon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield database_1.default.query("SELECT * FROM register WHERE email = ?", [req.body.email]);
            if (Object.keys(data).length === 0) {
                res.send('Logon realizado');
            }
            else {
                res.status(422).json({ error: 'ERRO' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("DELETE FROM register WHERE id = ?", [id]);
            res.json({ message: "register was deleted" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query("UPDATE register set ? WHERE id = ?", [req.body, id]);
            res.json({ message: "register Updated" });
        });
    }
}
const registerController = new RegisterController();
exports.default = registerController;
