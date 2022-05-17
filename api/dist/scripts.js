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
const express_1 = __importDefault(require("express"));
const path_1 = require("path");
const url_1 = require("url");
const fs_1 = __importDefault(require("fs"));
const db_js_1 = require("./db.js");
const utils_js_1 = require("./utils.js");
const ScriptRoutes = (0, express_1.default)();
const source = fs_1.default.readFileSync((0, path_1.dirname)((0, url_1.fileURLToPath)(import.meta.url)) + '/client.js').toString();
ScriptRoutes.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seed = {
            ip: req.ip,
            time: new Date()
        };
        yield db_js_1.data.insertOne(seed);
        return res.status(200).setHeader("Content-Type", "text/javascript").send(source.replace("$DATA_ID", seed._id).replace("$CALLBACK_URL", process.env.SCRIPT_CALLBACK_URL));
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(utils_js_1.ErrorMessages.ServerError);
    }
}));
exports.default = ScriptRoutes;
//# sourceMappingURL=scripts.js.map