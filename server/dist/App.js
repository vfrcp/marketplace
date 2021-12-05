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
const auth_1 = require("./routers/auth");
const config_1 = require("./config");
const mongoose_1 = require("mongoose");
const Error_1 = require("./models/Error");
const App = (0, express_1.default)();
App.use(express_1.default.json());
App.use("/auth", auth_1.router);
const PORT = config_1.config.Port || 5000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        throw Error("Test error");
        yield (0, mongoose_1.connect)(config_1.config.DbLink);
        yield App.listen(PORT, () => {
            console.log("App has been started");
        });
    }
    catch (err) {
        Error_1.ErrorHandle.create(err, "");
        console.log(`failed to start application. Error:${err}; Time: ${new Date()}
        -----------
        `);
    }
});
start().finally();
