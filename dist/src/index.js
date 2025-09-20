"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = __importDefault(require("./db/index"));
const index_2 = require("./config/index");
const index_3 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
// const PORT = process.env.BACKEND_PORT || 6000;
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '5mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// connectDB().then((data:any) => {});
new index_1.default(console).connect(index_2.MONGO_URL);
// Routes
// app.use("/api/invites", inviteRoutes);
app.use('/api', index_3.default);
// Basic route for health check
app.get('/', (req, res) => {
    res.send("E2Labs API is running 🚀");
});
app.listen(index_2.PORT, () => {
    console.log(`E2Labs Event Server running on port http://localhost:${index_2.PORT}`);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsc0RBQThCO0FBQzlCLGdEQUF3QjtBQUN4Qiw4REFBcUM7QUFDckMsdURBQTRCO0FBQzVCLDBDQUFnRDtBQUNoRCwyREFBc0M7QUFLdEMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQixpREFBaUQ7QUFDakQsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBTyxHQUFFLENBQUM7QUFFdEIsYUFBYTtBQUNiLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFDO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQy9DLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXhCLHNDQUFzQztBQUN0QyxJQUFJLGVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQW1CLENBQUMsQ0FBQztBQUU3QyxTQUFTO0FBQ1QseUNBQXlDO0FBRXpDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGVBQU0sQ0FBQyxDQUFDO0FBRXhCLCtCQUErQjtBQUMvQixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFDLENBQUM7QUFJSCxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQUksRUFBRSxHQUFHLEVBQUU7SUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsWUFBSSxFQUFFLENBQUMsQ0FBQztBQUNoRixDQUFDLENBQUMsQ0FBQyJ9