import mongoose, { Document, Schema } from "mongoose";

export interface IGuest extends Document {
    inviteId: string;
    name: string;
    phone: string;
    qrImage?: string
    status: "accepted" | "declined" | "pending";
    checkedIn: boolean;
    acceptedAt?: Date;
    checkedInAt?: Date;
}

const GuestSchema = new Schema<IGuest>({
    inviteId: { type: String, required: true, unique: true },
    qrImage: String,
    name:  { type: String, required: false},
    phone: { type: String, required: false},
    status: {
        type: String,
        enum: ["accepted", "declined", "pending"],
        default: "pending",
        required: true
    },
    checkedIn: { type: Boolean, default: false },
    acceptedAt: Date,
    checkedInAt: Date
});

export default mongoose.model<IGuest>("Guest", GuestSchema);
