const catchAsync = require("../utils/catchAsync");
const BusinessType = require("../models/BusinessTypeModel");

exports.getAllBusinessTypes = catchAsync(async (req, res, next) => {
  const businessTypes = await BusinessType.find();
  res.status(200).json({
    status: "success",
    results: businessTypes.length,
    data: businessTypes,
  });
});

exports.createBusinessType = catchAsync(async (req, res, next) => {
  const newBusinessType = await BusinessType.create(req.body);
  res.status(201).json({
    status: "success",
    data: newBusinessType,
  });
});

exports.getBusinessType = catchAsync(async (req, res, next) => {
  const buinessType = await BusinessType.findById(req.params.id);

  if (!buinessType)
    return next(new AppError("Business Type not found", 404));

  res.status(200).json({
    status: "success",
    data: buinessType,
  });
});

exports.updateBusinessType = catchAsync(async (req, res, next) => {
  const businessType = await BusinessType.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!businessType)
    return next(new AppError("Business Type not found", 404));

  res.status(200).json({
    status: "success",
    data: businessType,
  });
});

exports.deleteBusinessType = catchAsync(async (req, res, next) => {
  const businessType = await BusinessType.findByIdAndDelete(
    req.params.id
  );
  if (!businessType)
    next(new AppError("Business Type not found", 404));

  res.status(204).json({
    status: "success",
    data: null,
  });
});
