"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Guest_1 = __importDefault(require("../models/Guest"));
const qrcode_1 = __importDefault(require("qrcode"));
const router = (0, express_1.Router)();
// Create invite
router.post("/", async (req, res) => {
    try {
        const { name, phone } = req.body;
        if (!phone)
            return res.status(400).json({ error: "Phone is required" });
        const inviteId = new Date().getTime().toString(36) + Math.random().toString(36).substring(2, 8);
        const guest = await Guest_1.default.create({ inviteId, name, phone });
        const acceptUrl = `${process.env.FRONTEND_URL}/accept/${inviteId}`;
        const qrCodeUrl = await qrcode_1.default.toDataURL(acceptUrl);
        res.json({ guest, acceptUrl, qrCodeUrl });
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
// Get all guests
router.get("/invites", async (_req, res) => {
    try {
        const guests = await Guest_1.default.find().sort({ createdAt: -1 });
        res.json(guests);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
