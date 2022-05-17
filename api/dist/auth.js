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
exports.refresh = exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_js_1 = require("./db.js");
const crypto = __importStar(require("crypto"));
const utils_js_1 = require("./utils.js");
const mongodb_1 = require("mongodb");
const tokenExp = 60; // 1 min
const refreshTokenExp = 3600; // 1 hr
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json(utils_js_1.ErrorMessages.BadRequest);
    }
    const hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
    const query = { email: req.body.email, password: hash };
    const user = yield db_js_1.users.findOne(query);
    if (!user || !user.authorized || user.authorized != 'true') {
        return res.status(401).json(utils_js_1.ErrorMessages.Unauthorized);
    }
    const token = jsonwebtoken_1.default.sign({ type: "token", id: user._id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: tokenExp });
    const refresh = jsonwebtoken_1.default.sign({ type: "refresh token", id: user._id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: refreshTokenExp });
    return res.status(200).json({ token: token, refresh: refresh });
});
exports.authenticate = authenticate;
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
        return res.status(401).json(utils_js_1.ErrorMessages.Unauthorized);
    }
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (payload.type != 'token') {
            return res.status(401).json(utils_js_1.ErrorMessages.Unauthorized);
        }
        next();
    }
    catch (e) {
        return res.status(401).json(utils_js_1.ErrorMessages.Unauthorized);
    }
});
exports.authorize = authorize;
const refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.token || !req.body.id) {
        return res.status(400).json(utils_js_1.ErrorMessages.BadRequest);
    }
    try {
        const payload = jsonwebtoken_1.default.verify(req.body.token, process.env.JWT_SECRET);
        if (payload.type != 'refresh token') {
            return res.status(401).json(utils_js_1.ErrorMessages.Unauthorized);
        }
    }
    catch (e) {
        return res.status(401).json(utils_js_1.ErrorMessages.Unauthorized);
    }
    const query = { _id: new mongodb_1.ObjectId(req.body.id) };
    const user = yield db_js_1.users.findOne(query);
    if (!user || !user.authorized || user.authorized != 'true') {
        return res.status(401).json(utils_js_1.ErrorMessages.Unauthorized);
    }
    const token = jsonwebtoken_1.default.sign({ type: "token", id: user._id }, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: tokenExp });
    return res.status(200).json({ token: token });
});
exports.refresh = refresh;
//# sourceMappingURL=auth.js.map