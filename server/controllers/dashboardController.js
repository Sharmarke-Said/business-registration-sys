const Business = require("../models/BusinessModel");
const User = require("../models/userModel");
const BusinessType = require("../models/BusinessTypeModel");
const catchAsync = require("../utils/catchAsync");

exports.getDashboardStats = catchAsync(async (req, res, next) => {
  const [
    totalUsers,
    totalBusinesses,
    totalBusinessTypes,
    totalApprovedBusinesses,
    totalRejectedBusinesses,
    totalPendingBusinesses,
    businessByType,
    recentApprovedBusinesses,
  ] = await Promise.all([
    User.countDocuments({ role: "user" }),
    Business.countDocuments(),
    BusinessType.countDocuments(),
    Business.countDocuments({ status: "approved" }),
    Business.countDocuments({ status: "rejected" }),
    Business.countDocuments({ status: "pending" }),
    Business.aggregate([
      {
        $group: {
          _id: "$businessTypeId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "businesstypes",
          localField: "_id",
          foreignField: "_id",
          as: "businessType",
        },
      },
      {
        $unwind: "$businessType",
      },
      {
        $project: {
          _id: 0,
          businessType: "$businessType.name",
          count: 1,
        },
      },
    ]),
    Business.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "businessName businessOwner businessTypeId userId businessAddress status"
      )
      .populate("businessTypeId", "name")
      .populate("userId", "name"),
  ]);

  res.status(200).json({
    status: "success",
    data: {
      totals: {
        totalUsers,
        totalBusinesses,
        totalBusinessTypes,
        totalApprovedBusinesses,
        totalRejectedBusinesses,
        totalPendingBusinesses,
      },
      businessByType,
      recentApprovedBusinesses,
    },
  });
});

exports.getUserDashboardStats = catchAsync(async (req, res, next) => {
  const [
    totalBusinesses,
    totalApproved,
    totalPending,
    totalRejected,
  ] = await Promise.all([
    Business.countDocuments({ userId: req.user.id }),
    Business.countDocuments({
      userId: req.user.id,
      status: "approved",
    }),
    Business.countDocuments({
      userId: req.user.id,
      status: "pending",
    }),
    Business.countDocuments({
      userId: req.user.id,
      status: "rejected",
    }),
  ]);

  res.status(200).json({
    status: "success",
    data: {
      totals: {
        totalBusinesses,
        totalApproved,
        totalPending,
        totalRejected,
      },
    },
  });
});
