// import QRCode from "qrcode";
// import fs from "fs";
// import path from "path";
// import mongoose from "mongoose";
// import Guest from "../models/Guest";
// const totalGuests = 300;
// const prefix = "Wedding❤️";
// const outputDir = path.join(process.cwd(), "qrcodes");
//
//
// const MONGO_URI = process.env.MONGO_URI;
//
// function generateCode(length = 6) {
//     const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
//     let result = "";
//     for (let i = 0; i < length; i++) {
//         result += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return result;
// }
//
// if (!fs.existsSync(outputDir)) {
//     fs.mkdirSync(outputDir);
// }
//
// (async () => {
//     await mongoose.connect(MONGO_URI as string);
//     console.log("Connected to MongoDB");
//
//     const usedCodes = new Set<string>();
//
//     for (let i = 0; i < totalGuests; i++) {
//         let randomPart;
//         do {
//             randomPart = generateCode();
//         } while (usedCodes.has(randomPart));
//
//         usedCodes.add(randomPart);
//
//         const guestCode = `${prefix}-${randomPart}`;
//         const url = `http://192.168.0.150:3000/accept/${guestCode}`;
//
//         const qr = await QRCode.toDataURL(url);
//         const pngBuffer = Buffer.from(qr.replace(/^data:image\/png;base64,/, ""), "base64");
//
//         // Save QR image to folder
//         fs.writeFileSync(path.join(outputDir, `${guestCode}.png`), pngBuffer);
//         // Save guest record in MongoDB
//         await Guest.create({
//             inviteCode: guestCode,
//              qrImagePath: path.join("qrcodes", `${guestCode}.png`),
//              checkedIn: false
//         });
//         console.log(`Generated and stored QR for: ${guestCode}`);
//     }
//     console.log("All codes generated and saved");
//     await mongoose.disconnect();
// })();
//
// //npx ts-node Server/scripts/generateQRCodes.ts


import * as QRCode from "qrcode";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";
// import QRCode from "qrcode";
// import fs from "fs";
// import path from "path";
import mongoose from "mongoose";
import Guest from "../src/models/Guest";


const totalGuests = 300;
const prefix = "Wedding❤️";
const outputDir = path.join(__dirname, "../qrcodes");


const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ Missing MONGO_URI in .env file");
    process.exit(1);
}

function generateCode(length = 6) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");

        const usedCodes = new Set<string>();

        for (let i = 0; i < totalGuests; i++) {
            let randomPart;
            do {
                randomPart = generateCode();
            } while (usedCodes.has(randomPart));

            usedCodes.add(randomPart);

            const guestCode = `${prefix}-${randomPart}`;
            const url = `http://192.168.0.150:3000/accept/${guestCode}`;

            const qr = await QRCode.toDataURL(url);
            const pngBuffer = Buffer.from(qr.split(",")[1], "base64");

            fs.writeFileSync(path.join(outputDir, `${guestCode}.png`), pngBuffer);

            await Guest.create({
                inviteId: guestCode,
                qrImagePath: path.join("qrcodes", `${guestCode}.png`),
                checkedIn: false,
            });

            console.log(`🎉 Generated QR for: ${guestCode}`);
        }

        console.log("✅ All codes generated and saved");
    } catch (err) {
        console.error("❌ Error:", err);
    } finally {
        await mongoose.disconnect();
    }
})();

//npx ts-node scripts/generateQRCodes.ts