import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db/index";
import {MONGO_URL, PORT,} from "./config/index";
import routes   from "./routes/index";




dotenv.config();

// const PORT = process.env.BACKEND_PORT || 6000;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// connectDB().then((data:any) => {});
new db(console).connect(MONGO_URL as string);

// Routes
// app.use("/api/invites", inviteRoutes);

app.use('/api', routes);

// Basic route for health check
app.get('/', (req, res) => {
    res.send("E2Labs API is running 🚀");
});



app.listen(PORT, () => {
    console.log(`E2Labs Event Server running on port http://localhost:${PORT}`);
});
