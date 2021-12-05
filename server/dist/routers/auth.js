"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
// дженерик Реквеста это: первые 2 не знаю, 3 это req.body
exports.router.post("/login", (req, res) => {
});
exports.router.post("/register", (req, res) => {
});
