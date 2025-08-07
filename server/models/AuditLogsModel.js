import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: { type: String, required: true }, // e.g. "approved business", "deleted user"
    targetType: { type: String, required: true }, // e.g. "Business", "User"
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: { createdAt: "timestamp" } }
);

export default mongoose.model("AuditLog", auditLogSchema);
