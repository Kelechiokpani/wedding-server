import mongoose, { ObjectId } from "mongoose";
import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import __Guest, {IGuest} from "../models/Guest";
import { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } from "../config/index";
import { fileURLToPath } from 'url';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



const defaultEmailRecord = {
    facebook: "https://web.facebook.com/",
    twitter: "https://twitter.com/",
    instagram: "https://www.instagram.com/",
};

interface IEmailData {
    body: string;
    qrCode?: string;
    token?: string;
    userEmail: string;
    title: string;
    resetOTP?: string;
    greeting: string;
    verificationLink?:any;
}

export enum TemplateName {
    welcome = "welcome"
}

class EmailHandlers {
    private readonly userId: ObjectId;
    private userData!: IGuest;
    public templates = TemplateName;

    constructor({userId}:any) {
        this.userId = userId;
    }

    private async getTemplate(template: TemplateName, data: IEmailData) {
        const result = ejs.compile(this.getTemplateFile(template), {
            beautify: false,
        });
        return result({
            ...data,
            ...defaultEmailRecord,
        });
    }

    private getTemplateFile(template: TemplateName): string {
        return fs
            .readFileSync(path.join(process.cwd(), "src", "email_templates", `${template}.html`))
            .toString("utf8");
    }

    private createTransporter() {
        return nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            auth: {
                user: SMTP_USERNAME,
                pass: SMTP_PASSWORD,
            },
            secure: SMTP_PORT === "465",
            // secure: true, // Use SSL
        });
    }

    async InitEmailService() {
        const user = await __Guest.findOne({ _id: this.userId });
        if (!user) throw new Error("Unable to validate user");
        this.userData = user;
        return this;
    }


    async sendMail(to: string, subject: string, templateName: TemplateName, data: IEmailData, from = "E2Labs <devkelly539@gmail.com>") {
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
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;  // re-throw to be handled in the caller
        }
    }


    // Template call
    async welcomeEmail(qrCodeImage:any) {
        if (!this.userData) throw new Error("Ensure that InitEmailService is called first");
        const message: IEmailData = {
            body: "",
            userEmail: this.userData.email,
            title: "Welcome to E2Labs Inc!",
            greeting: `Hello ${this.userData.name.toUpperCase()}`,
            qrCode: qrCodeImage
        };

        try {
            await this.sendMail(
                this.userData.email,
                "Welcome to E2Labs Inc",
                this.templates.welcome,
                message
                //  { ...message, qrCode: qrCodeBase64 }
            );
            console.log("Welcome email sent successfully");
        } catch (error) {
            console.log("Error sending welcome email:", error);
        }
    }

}

export default EmailHandlers;