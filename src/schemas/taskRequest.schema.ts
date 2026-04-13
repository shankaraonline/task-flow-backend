import mongoose, { Schema } from "mongoose";

const TaskRequestSchema = new Schema(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true
    },

    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },

    title: {
      type: String,
      required: true
    },
    comments: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        message: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    description: {
      type: String
    },
    requiredBy: {
      type: Date
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "in_progress", "completed"],
      default: "pending"
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
  "TaskRequest",
  TaskRequestSchema
);