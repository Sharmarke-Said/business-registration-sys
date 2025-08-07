// controllers/reportsController.js
// controllers/reportsController.js
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const Business = require("../models/BusinessModel");
const BusinessType = require("../models/BusinessTypeModel");

exports.getUsersReport = catchAsync(async (req, res, next) => {
  const users = await User.find({ role: "user" }).select(
    "name email -_id"
  );

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

exports.getBusinessesReport = catchAsync(async (req, res, next) => {
  const { status } = req.query;
  const filter = status ? { status } : {};

  const businesses = await Business.find(filter)
    .populate({
      path: "user",
      select: "name email",
      strictPopulate: false,
    })
    .populate({
      path: "businessType",
      select: "name",
      strictPopulate: false,
    })
    .select("businessName registrationNumber status"); // REMOVED "-_id" HERE
  // .select("businessName registrationNumber status -_id"); // This was the old line

  res.status(200).json({
    status: "success",
    data: {
      businesses,
    },
  });
});

exports.getBusinessTypesReport = catchAsync(
  async (req, res, next) => {
    const businessTypes = await BusinessType.find().select(
      "name -_id"
    );

    res.status(200).json({
      status: "success",
      data: {
        businessTypes,
      },
    });
  }
);
