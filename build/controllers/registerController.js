"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
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
    saveUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blacklist = [
                {
                    'form': 'SELECT * FROM register'
                },
                {
                    'form': 'SELECT * FROM register WHERE id = ?'
                },
                {
                    'form': '? OR 1=1'
                },
                {
                    'form': 'INSERT INTO'
                },
                {
                    'form': 'DROP TABLE register'
                },
                {
                    'form': 'DROP TABLE products'
                },
                {
                    'form': 'funcionou1234567'
                }
            ];
            for (let i = 0; i < blacklist.length; i++) {
                if (req.body.email == blacklist[i].form || req.body.password == blacklist[i].form) {
                    return res.status(500).json({ msg: 'Impossivel registrar agora. Tente novamente mais tarde.' });
                }
            }
            let { email, password } = req.body;
            let data = yield database_1.default.query("SELECT * FROM register WHERE email = ?", [
                req.body.email,
            ]);
            const passwordHash = yield bcrypt.hash(password, 8);
            const user = {
                email,
                password: passwordHash,
            };
            if (!email) {
                return res
                    .status(422)
                    .json({ err: "Obrigat??rio preencher o campo EMAIL" });
            }
            if (!password) {
                return res
                    .status(422)
                    .json({ err: "Obrigat??rio preencher o campo SENHA" });
            }
            if (Object.keys(data).length === 0) {
                yield database_1.default.query("INSERT INTO register SET ?", [user]);
            }
            else {
                res.status(422).json({ err: "Usu??rio j?? cadastrado" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blacklist = [
                {
                    'form': 'SELECT * FROM register'
                },
                {
                    'form': 'SELECT * FROM register WHERE id = ?'
                },
                {
                    'form': '? OR 1=1'
                },
                {
                    'form': 'INSERT INTO'
                },
                {
                    'form': 'DROP TABLE register'
                },
                {
                    'form': 'DROP TABLE products'
                },
                {
                    'form': 'funcionou1234567'
                },
                {
                    'form': 'adicionar o que quiser que funciona'
                }
            ];
            for (let i = 0; i < blacklist.length; i++) {
                if (req.body.email == blacklist[i].form || req.body.password == blacklist[i].form) {
                    return res.status(500).json({ msg: 'Impossivel registrar agora. Tente novamente mais tarde.' });
                }
            }
            const data = yield database_1.default.query("SELECT * FROM register WHERE email = ?", [
                req.body.email,
            ]);
            if (data.length !== 0) {
                if (yield bcrypt.compare(req.body.password, data[0].password)) {
                    const token = jwt.sign({ id: data[0].id }, "d300a6359bff9592982a6ac996dab4ec", {
                        //Lembrar de criar .env com esse MD5 Hash
                        expiresIn: "1d",
                    });
                    const userData = {
                        id: data[0].id,
                        email: data[0].email,
                        token,
                    };
                    return res.json({ msg: "Usu??rio Logado com Sucesso", userData }); //Ser?? que userData ?? desnecess??rio?
                }
                else {
                    res.status(404).json({ err: "Usu??rio n??o encontrado" }); //Utilizar esse padr??o para n??o especificar que a senha que ?? incorreta
                }
                res.status(404).json({ err: "Usu??rio n??o encontrado" }); //Mesmo de acima
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
