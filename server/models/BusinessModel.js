const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    businessTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessType",
      required: true,
    },
    ownerName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactAddress: { type: String, required: true },
    businessAddress: {
      type: String,
    },

    registrationNumber: { type: String }, // Registration number separated

    // Documents array (only URL and uploadedAt)
    documents: [
      {
        _id: false,
        name: { type: String }, // Document name (e.g., "Business License")
        url: { type: String, required: true }, // Document URL (e.g., Cloudinary link)
        uploadedAt: { type: Date, default: Date.now }, // Auto-filled upload time
      },
    ],

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
