// routes/listItemRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/listItemController");

router.post("/listItem/add", controller.add);
router.post("/listItem/update", controller.update);
router.post("/listItem/delete", controller.remove);

module.exports = router;
