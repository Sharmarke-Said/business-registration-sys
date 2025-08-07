// routes/reportRoutes.js
const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reportsController");
const authController = require("../controllers/authController");

router.use(
  authController.protect,
  authController.restrictTo("admin")
);

router.get("/users", reportsController.getUsersReport);
router.get("/businesses", reportsController.getBusinessesReport);
router.get(
  "/business-types",
  reportsController.getBusinessTypesReport
);

module.exports = router;
