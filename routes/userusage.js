const express = require("express");
const userUsageController = require("../controllers/userUsageController");

const router = express.Router();

router.get(
  "/userusage/track/:userId",
  userUsageController.clickTranslateButton
);

module.exports = router;
