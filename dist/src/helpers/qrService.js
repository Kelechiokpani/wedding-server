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
Object.defineProperty(exports, "__esModule", { value: true });
const QRCode = __importStar(require("qrcode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const outputDir = path.join(__dirname, "../qrcodes");
const URL = "https://event-invitation-red.vercel.app";
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}
function generateCode(length = 6) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
async function generateUserQRCode(guest) {
    const guestCode = `Event-${generateCode()}`;
    const qrData = JSON.stringify({
        name: guest.name,
        email: guest.email,
        inviteId: guestCode,
    });
    // Generate URL that QR will point to
    const frontendUrl = URL || "http://localhost:3000";
    const guestUrl = `${frontendUrl}/guest/${guestCode}`;
    // Generate QR code for the URL
    const qr = await QRCode.toDataURL(guestUrl);
    const pngBuffer = Buffer.from(qr.split(",")[1], "base64");
    const qrPath = path.join(outputDir, `${guestCode}.png`);
    fs.writeFileSync(qrPath, pngBuffer);
    // Save the inviteId and qr path to guest
    guest.inviteId = guestCode;
    guest.qrImagePath = path.join("qrcodes", `${guestCode}.png`);
    await guest.save();
    return qrPath;
}
exports.default = generateUserQRCode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXJTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvcXJTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWlDO0FBQ2pDLHVDQUF5QjtBQUN6QiwyQ0FBNkI7QUFFN0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDcEQsTUFBTSxHQUFHLEdBQUcseUNBQXlDLENBQUE7QUFFdEQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUM5QixFQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFHRCxTQUFTLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQztJQUM5QixNQUFNLEtBQUssR0FBRyxrQ0FBa0MsQ0FBQztJQUNqRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBR0QsS0FBSyxVQUFVLGtCQUFrQixDQUFDLEtBQVU7SUFDMUMsTUFBTSxTQUFTLEdBQUcsU0FBUyxZQUFZLEVBQUUsRUFBRSxDQUFDO0lBRzVDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDNUIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO1FBQ2hCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztRQUNsQixRQUFRLEVBQUUsU0FBUztLQUNwQixDQUFDLENBQUM7SUFHRCxxQ0FBcUM7SUFDdkMsTUFBTSxXQUFXLEdBQUcsR0FBRyxJQUFJLHVCQUF1QixDQUFDO0lBQ25ELE1BQU0sUUFBUSxHQUFHLEdBQUcsV0FBVyxVQUFVLFNBQVMsRUFBRSxDQUFDO0lBR3JELCtCQUErQjtJQUMvQixNQUFNLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxNQUFNLENBQUMsQ0FBQztJQUV4RCxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUdwQyx5Q0FBeUM7SUFDekMsS0FBSyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7SUFDM0IsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLFNBQVMsTUFBTSxDQUFDLENBQUM7SUFDN0QsTUFBTSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFbkIsT0FBTyxNQUFNLENBQUM7QUFFaEIsQ0FBQztBQUdELGtCQUFlLGtCQUFrQixDQUFDIn0=