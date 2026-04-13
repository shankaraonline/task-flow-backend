import mongoose, { Schema } from "mongoose";

const NotificationSchema = new Schema(
{
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  tenantId: {
    type: Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ["task", "project", "system"],
    default: "system"
  },

  read: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false,
    index: true
  },
},
{ timestamps: true }
);

export default mongoose.model(
  "Notification",
  NotificationSchema
);