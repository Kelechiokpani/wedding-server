"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = require(".");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(_1.MONGO_URL);
        // await mongoose.connect(process.env.MONGO_URI as string || "mongodb://127.0.0.1:27017/wedding");
        console.log("✅ MongoDB connected");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//node --loader ts-node/esm src/index.ts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29uZmlnL2RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHdEQUFnQztBQUNoQyx3QkFBNEQ7QUFFckQsTUFBTSxTQUFTLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDaEMsSUFBSSxDQUFDO1FBQ0QsTUFBTSxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFtQixDQUFDLENBQUM7UUFDNUMsa0dBQWtHO1FBQ2xHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBVFcsUUFBQSxTQUFTLGFBU3BCO0FBRUYsd0NBQXdDIn0=