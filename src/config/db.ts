import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        // await mongoose.connect(process.env.MONGO_URI as string || "mongodb://127.0.0.1:27017/wedding");
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};

//node --loader ts-node/esm src/server.ts