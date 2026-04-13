import mongoose, { Schema } from "mongoose";

const EntrySchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    status: {
      type: String,
      enum: ["gray", "yellow", "green", "red"],
      default: "gray"
    },

    employeeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    serviceIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service"
      }
    ]

  },
  { _id: true }
);

const TaskSchema = new Schema(
  {
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
      index: true
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true
    },

    date: {
      type: String,
      required: true
    },

    entries: [EntrySchema],
    isArchived: {
      type: Boolean,
      default: false,
      index: true
    },

  },
  { timestamps: true }
);

/**
 * Improve performance for project/date queries
 */
TaskSchema.index({ projectId: 1, date: 1 ,isArchived: 1});

export default mongoose.model("Task", TaskSchema);