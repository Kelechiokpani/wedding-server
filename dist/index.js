"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./config/db");
const invites_1 = __importDefault(require("./routes/invites"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Wedding API is running 🚀");
});
(0, db_1.connectDB)().then((data) => { });
// Routes
app.use("/api/", invites_1.default);
const PORT = process.env.BACKEND_PORT || 6000;
app.listen(PORT, () => {
    console.log(`🚀Wedding Server running on port http://localhost:${PORT}`);
});
