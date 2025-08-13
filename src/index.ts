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

const port = process.env.BACKEND_PORT || 6000;
app.listen(port, () => {
    console.log(`🚀Wedding Server running on port http://localhost:${port}`);
});
