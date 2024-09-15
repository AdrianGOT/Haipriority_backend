"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// ========= Initial configurations ========= 
app.use(express_1.default.json());
// ========= Routes =========
app.use('/api/auh');
app.use('/api/client');
app.use('/api/credit-card');
app.use('/api/debit-card');
app.use('/api/loans');
app.listen(process.env.PORT, () => {
    console.log(`Running the app in ${process.env.PORT} port`);
});
