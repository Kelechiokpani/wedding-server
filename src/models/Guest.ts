import mongoose, { Document, Schema } from "mongoose";

export interface IGuest extends Document {
    inviteId: string;
    name: string;
    phone: string;
    qrImage?: string
    status: "accepted" | "declined";
    checkedIn: boolean;
    acceptedAt?: Date;
    checkedInAt?: Date;
}

const GuestSchema = new Schema<IGuest>({
    inviteId: { type: String, required: true, unique: true },
    qrImage: String,
    name: String,
    phone: String,
    status: {
        type: String,
        enum: ["accepted", "declined"],
        default: "declined"
    },
    checkedIn: { type: Boolean, default: false },
    acceptedAt: Date,
    checkedInAt: Date
});

export default mongoose.model<IGuest>("Guest", GuestSchema);
