import mongoose, { Schema } from "mongoose";

const PushSubscriptionSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  tenantId: {
    type: Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },

  subscription: {
    type: Object,
    required: true
  }

}, { timestamps: true });

export default mongoose.model(
  "PushSubscription",
  PushSubscriptionSchema
);