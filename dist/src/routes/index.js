"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emailService_1 = __importDefault(require("../helpers/emailService"));
const qrService_1 = __importDefault(require("../helpers/qrService"));
const Guest_1 = __importDefault(require("../models/Guest"));
const fs_1 = __importDefault(require("fs"));
// import { generateUserQRCode } from "../services/emailService";
// import { sendQRCodeEmail } from "../services/emailService";
const router = (0, express_1.Router)();
// Create invite
router.post("/send", async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        if (!phone)
            return res.status(400).json({ error: "Phone is required" });
        const inviteId = new Date().getTime().toString(36) + Math.random().toString(36).substring(2, 8);
        const newGuest = await Guest_1.default.create({ inviteId, name, phone, email });
        const qrCodeImage = await (0, qrService_1.default)(newGuest);
        // send email with QR attached
        const sendEmailService = await new emailService_1.default({ userId: newGuest._id }).InitEmailService();
        // await sendEmailService.welcomeEmail(qrCodeImage);
        const qrImageBase64 = fs_1.default.readFileSync(qrCodeImage).toString("base64");
        await sendEmailService.welcomeEmail(`data:image/png;base64,${qrImageBase64}`);
        res.status(201).json({
            message: "Guest registered successfully. QR Code sent to email.",
            guest: newGuest,
        });
        // const acceptUrl = `${process.env.FRONTEND_URL}/accept/${inviteId}`;
        // const qrCodeUrl = await qrcode.toDataURL(acceptUrl);
        // res.json({ newGuest, acceptUrl, qrCodeUrl });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
// Accept invite
router.post("/:inviteId/accept", async (req, res) => {
    try {
        const { inviteId } = req.params;
        const { name, phone, status } = req.body;
        const guest = await Guest_1.default.findOne({ inviteId: inviteId });
        if (!guest)
            return res.status(404).json({ error: "Invite not found" });
        guest.name = name;
        guest.phone = phone;
        guest.status = status;
        guest.acceptedAt = new Date();
        await guest.save();
        res.json({ message: "Invite accepted successfully", guest });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
// Check in a guest
router.post("/:inviteId/checkin", async (req, res) => {
    try {
        const { inviteId } = req.params;
        const guest = await Guest_1.default.findOne({ inviteId: inviteId });
        if (!guest)
            return res.status(404).json({ error: "Guest not found" });
        if (!guest.status) {
            return res.status(400).json({ error: "Guest has not accepted invite yet" });
        }
        guest.checkedIn = true;
        guest.checkedInAt = new Date();
        await guest.save();
        res.json({ message: "Guest checked in successfully", guest });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
// src/routes/invites.ts
router.get("/guest/:inviteId", async (req, res) => {
    console.log("📡 /api/invite id hit");
    try {
        const { inviteId } = req.params;
        const guest = await Guest_1.default.findOne({ inviteId });
        if (!guest)
            return res.status(404).json({ error: "Guest not found" });
        res.json(guest);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});
// Get all guests
router.get("/guests", async (_req, res) => {
    console.log("📡 /api/invites hit");
    try {
        const guests = await Guest_1.default.find().sort({ createdAt: -1 });
        res.json(guests);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQThEO0FBQzlELDJFQUFvRDtBQUNwRCxxRUFBd0Q7QUFDeEQsNERBQW1DO0FBQ25DLDRDQUFvQjtBQUdwQixpRUFBaUU7QUFDakUsOERBQThEO0FBRTlELE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRXhCLGdCQUFnQjtBQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ3ZELElBQUksQ0FBQztRQUNELE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFLENBQUMsQ0FBQztRQUV4RSxNQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFaEcsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUV0RSxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUEsbUJBQWtCLEVBQUMsUUFBUSxDQUFDLENBQUM7UUFFekQsOEJBQThCO1FBQzVCLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJ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