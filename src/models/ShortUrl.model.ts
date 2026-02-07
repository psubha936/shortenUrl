
import mongoose, { Document } from "mongoose";

export interface ShortUrl {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdByKey: mongoose.Types.ObjectId;
}

export interface ShortUrlDocument extends ShortUrl, Document {
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema<ShortUrlDocument>({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  createdByKey: { type: mongoose.Schema.Types.ObjectId, ref: "ApiKey" }
}, { timestamps: true });

export const ShortUrlModel = mongoose.model<ShortUrlDocument>("ShortUrl", schema);
