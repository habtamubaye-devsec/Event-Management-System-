const express = require("express");
const validateToken = require("../middleware/validateToken");
const upload = require("../middleware/uploadImage")
const {
  getEvents,
  getSingleEvents,
  createEvents,
  updateEvents,
  deleteEvents,
} = require("../controller/eventsController");

const router = express.Router();

router.get("/get-event", validateToken, getEvents);
router.get("/get-event/:id", validateToken, getSingleEvents);
router.post("/create-event", validateToken, upload.array("media", 5), createEvents);
router.put("/update-event/:id", validateToken, upload.single("media", 5), updateEvents);
router.delete("/delete-event/:id", validateToken, deleteEvents);

module.exports = router;
