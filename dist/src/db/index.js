"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const options = {
    // keepAlive: true,
    serverSelectionTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
class db {
    constructor(log) {
        this.log = log;
    }
    connect(DB_URL) {
        const log = this.log;
        mongoose_1.default.set("strictQuery", false);
        const connectWithRetry = () => {
            log.info('Attempting MongoDB connection (will retry if needed)');
            mongoose_1.default
                .connect(DB_URL, options)
                .then(async () => {
                log.info(`Successfully connected to `, DB_URL);
            })
                .catch((err) => {
                log.error(`There was a db connection error: `, err);
                setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
            });
        };
        connectWithRetry();
        mongoose_1.default.connection.on("disconnected", () => {
            log.error(`Successfully disconnected from ${DB_URL}`);
        });
        process.on("SIGINT", () => {
            mongoose_1.default.connection.close().then(() => {
                log.error("dBase connection closed due to app termination");
            });
        });
    }
}
exports.default = db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBZ0M7QUFDaEMsb0RBQTRCO0FBRTVCLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxPQUFPLEdBQUc7SUFDWixtQkFBbUI7SUFDbkIsd0JBQXdCLEVBQUUsS0FBSztJQUMvQixlQUFlLEVBQUUsSUFBSTtJQUNyQixrQkFBa0IsRUFBRSxJQUFJO0NBQzNCLENBQUM7QUFFRixNQUFNLEVBQUU7SUFFSixZQUFZLEdBQVE7UUFDaEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQztJQUVNLE9BQU8sQ0FBQyxNQUFjO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsa0JBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRW5DLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxFQUFFO1lBQzFCLEdBQUcsQ0FBQyxJQUFJLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUNqRSxrQkFBUTtpQkFDSCxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztpQkFDeEIsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNoQixHQUFHLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNwRCxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQ0FBbUM7WUFDM0UsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUM7UUFHRixnQkFBZ0IsRUFBRSxDQUFDO1FBRW5CLGtCQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFO1lBQ3hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0NBQWtDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDdEIsa0JBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDbEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxFQUFFLENBQUMifQ==