import { Document, model, Schema } from "mongoose";

export interface MessageCountInt extends Document {
  serverId: string;
  userId: string;
  userTag: string;
  messages: number;
  cooldown: number;
}

export const MessageCount = new Schema({
  serverId: String,
  userId: String,
  userTag: String,
  messages: Number,
  cooldown: Number,
});

export default model<MessageCountInt>("MessageCount", MessageCount);
