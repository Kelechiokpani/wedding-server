import * as QRCode from "qrcode";
import * as fs from "fs";
import * as path from "path";

const outputDir = path.join(__dirname, "../qrcodes");
 const URL = "https://event-invitation-red.vercel.app"

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


async function generateUserQRCode(guest: any) {
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


export default generateUserQRCode;
