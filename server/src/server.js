"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const boardRoutes_1 = __importDefault(require("./routes/boardRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
(0, db_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use('/api/boards', boardRoutes_1.default);
app.use('/api/boards/task', taskRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, '../../', 'client', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => res.send('Please set to production'));
}
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`App running on PORT ${PORT}`));
