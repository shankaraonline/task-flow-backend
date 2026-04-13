import mongoose, { Schema, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  tenantId?: mongoose.Types.ObjectId
  name: string
  username: string
  password: string
  role: "super_admin" | "admin" | "employee"
  level: number,
  assignedProjectIds?: mongoose.Types.ObjectId,
  isArchived: boolean
}

type UserDocument = HydratedDocument<IUser>;

const UserSchema = new Schema<IUser>({
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: "Tenant",
    required: false
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["super_admin", "admin", "employee", "client"],
    default: "employee"
  },

  level: {
    type: Number,
    default: 0
  },
  isArchived: {
    type: Boolean,
    default: false,
    index: true
  },
  assignedProjectIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project"
    }
  ]
}, { timestamps: true });

UserSchema.index({ tenantId: 1, username: 1 }, { unique: true });

/**
 * Hash password before saving
 */
UserSchema.pre("save", async function (this: UserDocument) {

  if (!this.isModified("password"))
    return;

  this.password = await bcrypt.hash(this.password, 10);

});

export default mongoose.model<IUser>("User", UserSchema);