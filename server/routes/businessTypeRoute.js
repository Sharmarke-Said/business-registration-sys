const express = require("express");
const authController = require("./../controllers/authController");
const businessTypeController = require("./../controllers/businessTypeController");

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

router
  .route("/")
  .get(businessTypeController.getAllBusinessTypes) // This route is now open to all authenticated users
  .post(
    authController.restrictTo("admin"),
    businessTypeController.createBusinessType
  ); // Only admins can create a new business type

router
  .route("/:id")
  .get(businessTypeController.getBusinessType) // Open to all authenticated users
  .patch(
    authController.restrictTo("admin"),
    businessTypeController.updateBusinessType
  ) // Only admins can update
  .delete(
    authController.restrictTo("admin"),
    businessTypeController.deleteBusinessType
  ); // Only admins can delete

module.exports = router;
