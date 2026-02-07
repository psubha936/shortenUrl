import mongoose, { Document } from "mongoose";

export interface Analytics {
  shortCode: string;
  ip: string;
  userAgent: string;
  referer?: string;
  os?: string;
  browser?: string;
  createdAt: Date;
}

export interface AnalyticsDocument extends Analytics, Document { }

const schema = new mongoose.Schema<AnalyticsDocument>({
  shortCode: { type: String, required: true, index: true },
  ip: { type: String, required: true, index: true },
  userAgent: { type: String },
  referer: { type: String },
  os: { type: String },
  browser: { type: String },
  createdAt: { type: Date, default: Date.now }
});

schema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }
);

export const AnalyticsModel =
  mongoose.model<AnalyticsDocument>("Analytics", schema);