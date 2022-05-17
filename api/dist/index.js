"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_js_1 = __importDefault(require("./user.js"));
const data_js_1 = __importDefault(require("./data.js"));
const scripts_js_1 = __importDefault(require("./scripts.js"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, morgan_1.default)('tiny'));
app.use("/data", data_js_1.default);
app.use("/user", user_js_1.default);
app.use("/scripts", scripts_js_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map