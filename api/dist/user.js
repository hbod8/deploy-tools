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
const express_1 = __importDefault(require("express"));
const utils_js_1 = require("./utils.js");
const db_js_1 = require("./db.js");
const crypto = __importStar(require("crypto"));
const auth_js_1 = require("./auth.js");
const UserRoutes = (0, express_1.default)();
UserRoutes.get("/", auth_js_1.authorize, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = yield db_js_1.users.find().toArray();
        return res.status(200).json(q);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(utils_js_1.ErrorMessages.ServerError);
    }
}));
UserRoutes.post("/login", auth_js_1.authenticate);
UserRoutes.post("/refresh", auth_js_1.refresh);
UserRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json(utils_js_1.ErrorMessages.BadRequest);
    }
    const hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
    const document = yield db_js_1.users.insertOne({ email: req.body.email, password: hash, authorized: "false" });
    return res.status(200).json({ id: document._id });
}));
exports.default = UserRoutes;
//# sourceMappingURL=user.js.map