const express = require("express");
const businessController = require("../controllers/businessController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes
router.use(authController.protect);

// Admin-only routes
router.get(
  "/",
  authController.restrictTo("admin"),
  businessController.getAllBusinesses
);

router.get(
  "/:id",
  authController.restrictTo("admin"),
  businessController.getBusiness
);

router.patch(
  "/:id",
  authController.restrictTo("admin"),
  businessController.updateBusiness
);

router.delete(
  "/:id",
  authController.restrictTo("admin"),
  businessController.deleteBusiness
);

// Admin and User: Create business
router.post(
  "/",
  authController.restrictTo("user", "admin"),
  businessController.uploadBusinessDocuments,
  businessController.saveBusinessDocuments,
  businessController.createBusiness
);

router.patch(
  "/:id/approval",
  authController.restrictTo("admin"),
  businessController.approveOrRejectBusiness
);

// User-only routes
router.get(
  "/me/my-business",
  authController.restrictTo("user"),
  businessController.getMyBusiness // This fetches ALL of the user's businesses
);

router.get(
  "/me/my-business/:id",
  authController.restrictTo("user"),
  businessController.getMySingleBusiness // This fetches a SINGLE business for the user
);

router.patch(
  "/me/update-my-business/:id",
  authController.restrictTo("user"),
  businessController.updateMyBusiness
);

router.delete(
  "/me/delete-my-business/:id",
  authController.restrictTo("user"),
  businessController.deleteMyBusiness
);

module.exports = router;
