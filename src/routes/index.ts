import { Router, type Request, type Response } from "express";
import EmailHandlers from "../helpers/emailService";
import  generateUserQRCode  from "../helpers/qrService";
import Guest from "../models/Guest"
import fs from "fs";


// import { generateUserQRCode } from "../services/emailService";
// import { sendQRCodeEmail } from "../services/emailService";

const router = Router();

// Create invite
router.post("/send", async (req: Request, res: Response) => {
    try {
        const { name, phone, email } = req.body;
        if (!phone) return res.status(400).json({ error: "Phone is required" });

        const inviteId = new Date().getTime().toString(36) + Math.random().toString(36).substring(2, 8);

        const newGuest = await Guest.create({ inviteId, name, phone, email });
    
        const qrCodeImage = await generateUserQRCode(newGuest);

      // send email with QR attached
        const sendEmailService = await new EmailHandlers({ userId: newGuest._id }).InitEmailService();
        // await sendEmailService.welcomeEmail(qrCodeImage);

        const qrImageBase64 = fs.readFileSync(qrCodeImage).toString("base64");
        await sendEmailService.welcomeEmail(`data:image/png;base64,${qrImageBase64}`);

          res.status(201).json({
            message: "Guest registered successfully. QR Code sent to email.",
            guest: newGuest,
        });

        // const acceptUrl = `${process.env.FRONTEND_URL}/accept/${inviteId}`;
        // const qrCodeUrl = await qrcode.toDataURL(acceptUrl);
        // res.json({ newGuest, acceptUrl, qrCodeUrl });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Accept invite
router.post("/:inviteId/accept", async (req: Request, res: Response) => {
    try {
        const { inviteId } = req.params;
        const { name, phone, status } = req.body;
        const guest = await Guest.findOne({inviteId: inviteId });
        if (!guest) return res.status(404).json({ error: "Invite not found" });
        guest.name = name
        guest.phone = phone
        guest.status = status;
        guest.acceptedAt = new Date();
        await guest.save();
        res.json({ message: "Invite accepted successfully", guest });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


// Check in a guest
router.post("/:inviteId/checkin", async (req: Request, res: Response) => {
    try {
        const { inviteId } = req.params;
        const guest = await Guest.findOne({inviteId: inviteId });
        if (!guest) return res.status(404).json({ error: "Guest not found" });
        if (!guest.status) {
            return res.status(400).json({ error: "Guest has not accepted invite yet" });
        }
        guest.checkedIn = true;
        guest.checkedInAt = new Date();
        await guest.save();
        res.json({ message: "Guest checked in successfully", guest });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


// src/routes/invites.ts
router.get("/guest/:inviteId", async (req, res) => {
      console.log("📡 /api/invite id hit");
  try {
    const { inviteId } = req.params;
    const guest = await Guest.findOne({ inviteId });
    if (!guest) return res.status(404).json({ error: "Guest not found" });
    res.json(guest);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// Get all guests
router.get("/guests", async (_req: Request, res: Response) => {
      console.log("📡 /api/invites hit");
    try {
        const guests = await Guest.find().sort({ createdAt: -1 });
        res.json(guests);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});



export default router;
