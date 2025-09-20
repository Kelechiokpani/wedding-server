"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateName = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const Guest_1 = __importDefault(require("../models/Guest"));
const index_1 = require("../config/index");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const defaultEmailRecord = {
    facebook: "https://web.facebook.com/",
    twitter: "https://twitter.com/",
    instagram: "https://www.instagram.com/",
};
var TemplateName;
(function (TemplateName) {
    TemplateName["welcome"] = "welcome";
})(TemplateName || (exports.TemplateName = TemplateName = {}));
class EmailHandlers {
    constructor({ userId }) {
        this.templates = TemplateName;
        this.userId = userId;
    }
    async getTemplate(template, data) {
        const result = ejs_1.default.compile(this.getTemplateFile(template), {
            beautify: false,
        });
        return result({
            ...data,
            ...defaultEmailRecord,
        });
    }
    getTemplateFile(template) {
        return fs_1.default
            .readFileSync(path_1.default.join(process.cwd(), "src", "email_templates", `${template}.html`))
            .toString("utf8");
    }
    createTransporter() {
        return nodemailer_1.default.createTransport({
            host: index_1.SMTP_HOST,
            port: Number(index_1.SMTP_PORT),
            auth: {
                user: index_1.SMTP_USERNAME,
                pass: index_1.SMTP_PASSWORD,
            },
            secure: index_1.SMTP_PORT === "465",
            // secure: true, // Use SSL
        });
    }
    async InitEmailService() {
        const user = await Guest_1.default.findOne({ _id: this.userId });
        if (!user)
            throw new Error("Unable to validate user");
        this.userData = user;
        return this;
    }
    async sendMail(to, subject, templateName, data, from = "E2Labs <devkelly539@gmail.com>") {
        const transporter = this.createTransporter();
        try {
            const htmlContent = await this.getTemplate(templateName, { ...data });
            const attachments = data.qrCode
                ? [
                    {
                        filename: "qrcode.png",
                        content: Buffer.from(data.qrCode.split(",")[1], "base64"),
                        cid: "qrCode", // matches <img src="cid:qrCode" />
                    },
                ]
                : [];
            const mailOptions = {
                from,
                to,
                subject,
                html: htmlContent,
                attachments
            };
            const info = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully:", info.response);
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw error; // re-throw to be handled in the caller
        }
    }
    // Template call
    async welcomeEmail(qrCodeImage) {
        if (!this.userData)
            throw new Error("Ensure that InitEmailService is called first");
        const message = {
            body: "",
            userEmail: this.userData.email,
            title: "Welcome to E2Labs Inc!",
            greeting: `Hello ${this.userData.name.toUpperCase()}`,
            qrCode: qrCodeImage
        };
        try {
            await this.sendMail(this.userData.email, "Welcome to E2Labs Inc", this.templates.welcome, message
            //  { ...message, qrCode: qrCodeBase64 }
            );
            console.log("Welcome email sent successfully");
        }
        catch (error) {
            console.log("Error sending welcome email:", error);
        }
    }
}
exports.default = EmailHandlers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2hlbHBlcnMvZW1haWxTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLDREQUFvQztBQUNwQyw4Q0FBc0I7QUFDdEIsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4Qiw0REFBZ0Q7QUFDaEQsMkNBQXFGO0FBSXJGLHFEQUFxRDtBQUNyRCw4Q0FBOEM7QUFJOUMsTUFBTSxrQkFBa0IsR0FBRztJQUN2QixRQUFRLEVBQUUsMkJBQTJCO0lBQ3JDLE9BQU8sRUFBRSxzQkFBc0I7SUFDL0IsU0FBUyxFQUFFLDRCQUE0QjtDQUMxQyxDQUFDO0FBYUYsSUFBWSxZQUVYO0FBRkQsV0FBWSxZQUFZO0lBQ3BCLG1DQUFtQixDQUFBO0FBQ3ZCLENBQUMsRUFGVyxZQUFZLDRCQUFaLFlBQVksUUFFdkI7QUFFRCxNQUFNLGFBQWE7SUFLZixZQUFZLEVBQUMsTUFBTSxFQUFLO1FBRmpCLGNBQVMsR0FBRyxZQUFZLENBQUM7UUFHNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVPLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBc0IsRUFBRSxJQUFnQjtRQUM5RCxNQUFNLE1BQU0sR0FBRyxhQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdkQsUUFBUSxFQUFFLEtBQUs7U0FDbEIsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUM7WUFDVixHQUFHLElBQUk7WUFDUCxHQUFHLGtCQUFrQjtTQUN4QixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sZUFBZSxDQUFDLFFBQXNCO1FBQzFDLE9BQU8sWUFBRTthQUNKLFlBQVksQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxRQUFR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