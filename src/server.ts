import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {connectDB}  from "./config/db";
import inviteRoutes from "./routes/invites";

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Wedding API is running 🚀");
});

connectDB().then((data:any) => {});

// Routes
app.use("/api/", inviteRoutes);

const PORT = process.env.BACKEND_PORT || 6000;
app.listen(PORT, () => {
    console.log(`🚀Wedding Server running on port http://localhost:${PORT}`);
});
