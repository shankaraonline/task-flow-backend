import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema(
{
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },

  name: {
    type: String,
    required: true
  },
  serviceIds:[
  {
    type: Schema.Types.ObjectId,
    ref:"Service"
  }
],
isArchived: {
    type: Boolean,
    default: false,
    index: true
  },
},
{ timestamps:true }
);

export default mongoose.model("Project", ProjectSchema);