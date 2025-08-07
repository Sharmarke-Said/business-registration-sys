const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Business = require("./../models/BusinessModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const filterObj = (obj, ...allowedFields) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => allowedFields.includes(key))
  );

// 1) Multer configuration: store files in memory
const multerStorage = multer.memoryStorage();

// 2) Multer file filter: only accept PDFs
const multerFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Not a PDF! Please upload only PDF documents.",
        400
      ),
      false
    );
  }
};

// 3) Initialize multer upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// 4) Exports: Multer middleware to handle document uploads
exports.uploadBusinessDocuments = upload.array("documents", 4);

// 5) Predefined document names
const documentNames = [
  "Owner Identity Proof",
  "Business Registration Certificate",
  "Tax Identification Document",
  "Proof of Address",
];

// 6) Save uploaded documents locally
exports.saveBusinessDocuments = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length !== 4) {
    return next(
      new AppError(
        "Please upload exactly 4 documents in the required order.",
        400
      )
    );
  }

  const docsDir = path.join(
    __dirname,
    "..",
    "public",
    "docs",
    "businesses"
  );

  // Ensure the destination folder exists
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  req.body.documents = [];

  await Promise.all(
    req.files.map(async (file, index) => {
      const filename = `business-${Date.now()}-${index + 1}.pdf`;
      const filepath = path.join(docsDir, filename);

      fs.writeFileSync(filepath, file.buffer);

      req.body.documents.push({
        name: documentNames[index],
        url: `/docs/businesses/${filename}`,
        uploadedAt: new Date(),
      });
    })
  );

  next();
});

// 7) Create a new Business
// exports.createBusiness = catchAsync(async (req, res, next) => {
//   req.body.userId = req.user.id; // Attach currently logged-in user ID
//   const newBusiness = await Business.create(req.body);

//   res.status(201).json({
//     status: "success",
//     data: {
//       business: newBusiness,
//     },
//   });
// });

exports.createBusiness = catchAsync(async (req, res, next) => {
  req.body.userId = req.user.id;

  let newBusiness;
  try {
    newBusiness = await Business.create(req.body);
  } catch (err) {
    // If error happens during business creation, delete uploaded documents
    if (req.body.documents && req.body.documents.length > 0) {
      req.body.documents.forEach((doc) => {
        const filepath = path.join(
          __dirname,
          "..",
          "public",
          doc.url
        ); // Already relative path
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath); // Delete the file
        }
      });
    }
    // Then throw error forward to error handler
    return next(
      new AppError(
        "Failed to create business. Please try again.",
        500
      )
    );
  }

  res.status(201).json({
    status: "success",
    data: {
      business: newBusiness,
    },
  });
});

// Get current user's business
exports.getMyBusiness = catchAsync(async (req, res, next) => {
  const businesses = await Business.find({ userId: req.user.id });

  if (!businesses || businesses.length === 0) {
    return next(
      new AppError("You do not have any businesses yet.", 404)
    );
  }

  res.status(200).json({
    status: "success",
    results: businesses.length,
    data: {
      businesses,
    },
  });
});

// Update current user's business
exports.updateMyBusiness = catchAsync(async (req, res, next) => {
  // Prevent updating documents or sensitive fields manually here
  const allowedFields = [
    "businessName",
    "businessTypeId",
    "ownerName",
    "contactEmail",
    "contactPhone",
    "businessAddress",
    "registrationNumber",
  ];
  const filteredBody = filterObj(req.body, ...allowedFields);

  const updatedBusiness = await Business.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!updatedBusiness) {
    return next(new AppError("No business found to update.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      business: updatedBusiness,
    },
  });
});

exports.deleteMyBusiness = catchAsync(async (req, res, next) => {
  const business = await Business.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!business) {
    return next(
      new AppError("You do not have this business to delete.", 404)
    );
  }

  if (business.documents && business.documents.length > 0) {
    for (const doc of business.documents) {
      const filePath = path.join(__dirname, "..", "public", doc.url);

      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.error("Failed to delete file:", filePath, err);
      }
    }
  }

  await Business.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// 8) Get all Businesses
exports.getAllBusinesses = catchAsync(async (req, res, next) => {
  const businesses = await Business.find();

  res.status(200).json({
    status: "success",
    results: businesses.length,
    data: {
      businesses,
    },
  });
});

// 9) Get a single Business by ID
exports.getBusiness = catchAsync(async (req, res, next) => {
  const business = await Business.findById(req.params.id);

  if (!business) {
    return next(new AppError("No business found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      business,
    },
  });
});

// 10) Update Business
exports.updateBusiness = catchAsync(async (req, res, next) => {
  const business = await Business.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!business) {
    return next(new AppError("No business found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      business,
    },
  });
});

// 11) Delete Business
exports.deleteBusiness = catchAsync(async (req, res, next) => {
  const business = await Business.findByIdAndDelete(req.params.id);

  if (!business) {
    return next(new AppError("No business found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Approve or Reject Business
exports.approveOrRejectBusiness = catchAsync(
  async (req, res, next) => {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return next(
        new AppError(
          'Status must be either "approved" or "rejected".',
          400
        )
      );
    }

    const business = await Business.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!business) {
      return next(
        new AppError("No business found with that ID.", 404)
      );
    }

    res.status(200).json({
      status: "success",
      message: `Business ${status} successfully.`,
      data: { business },
    });
  }
);

exports.getMySingleBusiness = catchAsync(async (req, res, next) => {
  const business = await Business.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!business) {
    return next(new AppError("You do not have this business.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      business,
    },
  });
});
