import mongoose, { Schema } from "mongoose";

const TenantSchema = new Schema(
{
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isArchived: {
    type: Boolean,
    default: false,
    index: true
  }
},
{ timestamps: true }
);

export default mongoose.model("Tenant", TenantSchema);