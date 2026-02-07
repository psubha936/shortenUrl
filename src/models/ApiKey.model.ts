
import mongoose, { Document } from "mongoose";

export interface ApiKey {
  name: string;
  createdBy: string;
  key: string;
  isActive: boolean;
}

export interface ApiKeyDocument extends ApiKey, Document {}

const schema = new mongoose.Schema<ApiKeyDocument>({
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  key: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const ApiKeyModel = mongoose.model<ApiKeyDocument>("ApiKey", schema);
