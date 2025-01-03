"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = require("./database/connection");
const router_1 = __importDefault(require("./routes/router"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
(0, connection_1.connectDB)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('short'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', router_1.default);
app.get('/', (req, res) => {
    res.send('Attendance Heyjong Secretary');
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
