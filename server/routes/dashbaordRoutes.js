const express = require("express");
const authController = require("../controllers/authController");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

// Protect all routes
router.use(authController.protect);

router.get(
  "/stats",
  authController.restrictTo("admin"),
  dashboardController.getDashboardStats
);

router.get(
  "/user-stats",
  authController.restrictTo("user"),
  dashboardController.getUserDashboardStats
);

module.exports = router;
