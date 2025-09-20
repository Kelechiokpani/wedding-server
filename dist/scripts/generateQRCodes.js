"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QRCode = __importStar(require("qrcode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const Guest_1 = __importDefault(require("../src/models/Guest"));
const totalGuests = 300;
const prefix = "Wedding";
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
        await mongoose_1.default.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");
        const usedCodes = new Set();
        for (let i = 0; i < totalGuests; i++) {
            let randomPart;
            do {
                randomPart = generateCode();
            } while (usedCodes.has(randomPart));
            usedCodes.add(randomPart);
            const guestCode = `${prefix}-${randomPart}`;
            // const url = `http://192.168.0.150:3000/accept/${guestCode}`;
            const url = `https://wedding-client-duq7.vercel.app/accept/${guestCode}`;
            const qr = await QRCode.toDataURL(url);
            const pngBuffer = Buffer.from(qr.split(",")[1], "base64");
            fs.writeFileSync(path.join(outputDir, `${guestCode}.png`), pngBuffer);
            await Guest_1.default.create({
                inviteId: guestCode,
                qrImagePath: path.join("qrcodes", `${guestCode}.png`),
                checkedIn: false,
            });
            console.log(`🎉 Generated QR for: ${guestCode}`);
        }
        console.log("✅ All codes generated and saved");
    }
    catch (err) {
        console.error("❌ Error:", err);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
})();
//npx ts-node scripts/generateQRCodes.ts
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVRUkNvZGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc2NyaXB0cy9nZW5lcmF0ZVFSQ29kZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBaUM7QUFDakMsdUNBQXlCO0FBQ3pCLDJDQUE2QjtBQUM3Qix5QkFBdUI7QUFDdkIsd0RBQWdDO0FBQ2hDLGdFQUF3QztBQUd4QyxNQUFNLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDeEIsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBR3JELE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBQ3hDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUNsRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQztJQUM1QixNQUFNLEtBQUssR0FBRyxrQ0FBa0MsQ0FBQztJQUNqRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUM1QixFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQ1IsSUFBSSxDQUFDO1FBQ0QsTUFBTSxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFdEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUVwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkMsSUFBSSxVQUFVLENBQUM7WUFDZixHQUFHLENBQUM7Z0JBQ0EsVUFBVSxHQUFHLFlBQVksRUFBRSxDQUFDO1lBQ2hDLENBQUMsUUFBUSxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBRXBDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFMUIsTUFBTSxTQUFTLEdBQUcsR0FBRyxNQUFNLElBQUksVUFBVSxFQUFFLENBQUM7WUFDNUMsK0RBQStEO1lBQy9ELE1BQU0sR0FBRyxHQUFHLGlEQUFpRCxTQUFTLEVBQUUsQ0FBQztZQUV6RSxNQUFNLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRTFELEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLE1BQU0sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXRFLE1BQU0sZUFBSyxDQUFDLE1BQU0sQ0FBQztnQkFDZixRQUFRLEVBQUUsU0FBUztnQkFDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxNQUFNLENBQUM7Z0JBQ3JELFNBQVMsRUFBRSxLQUFLO2FBQ25CLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7WUFBUyxDQUFDO1FBQ1AsTUFBTSxrQkFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hDLENBQUM7QUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsd0NBQXdDIn0=