// controllers/businessController.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Business = require("./../models/BusinessModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory"); // Assuming you're using handlerFactory for basic CRUD ops

// 1) Multer Setup: Store documents in memory first
const multerStorage = multer.memoryStorage();

// 2) Multer Filter: Only accept PDF files
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

// 3) Configure Multer upload
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// 4) Middleware for handling multiple document uploads
exports.uploadBusinessDocuments = upload.array("documents", 4);
// Max 4 PDFs (Owner Identity, Registration Cert, Tax ID, Proof of Address)

// 5) Saving documents to disk and setting req.body.documents
exports.saveBusinessDocuments = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(
      new AppError("Please upload at least one document.", 400)
    );
  }

  req.body.documents = []; // Initialize documents array in body

  const documentNames = [
    "Owner Identity Proof",
    "Business Registration Certificate",
    "Tax Identification Document",
    "Proof of Address",
  ];

  // Ensure folder exists
  const uploadDir = path.join(
    __dirname,
    "..",
    "public",
    "docs",
    "businesses"
  );
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  await Promise.all(
    req.files.map(async (file, index) => {
      const filename = `business-${Date.now()}-${index + 1}.pdf`;
      const filepath = path.join(uploadDir, filename);

      // Write file to disk
      await fs.promises.writeFile(filepath, file.buffer);

      // Push to req.body.documents array
      req.body.documents.push({
        name: documentNames[index] || `Document ${index + 1}`,
        url: `/docs/businesses/${filename}`, // Relative URL
        uploadedAt: new Date(),
      });
    })
  );

  next();
});

// 6) Factory CRUD operations
exports.getAllBusinesses = factory.getAll(Business);
exports.getBusiness = factory.getOne(Business);
exports.createBusiness = factory.createOne(Business);
exports.updateBusiness = factory.updateOne(Business);
exports.deleteBusiness = factory.deleteOne(Business);
