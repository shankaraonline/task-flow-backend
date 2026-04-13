import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema(
{
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },

  name: {
    type: String,
    required: true
  },isArchived: {
    type: Boolean,
    default: false,
    index: true
  },
},
{ timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);