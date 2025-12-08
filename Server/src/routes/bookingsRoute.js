const express = require("express");
const validateToken = require("../middleware/validateToken");
const {
  createBooking,
  getUserBooking,
  cancelBooking,
  getAllBooking,
  //deleteBooking,
} = require("../controller/bookingsController");

const router = express.Router();

router.post("/create-booking", validateToken, createBooking);
router.get("/get-user-booking", validateToken, getUserBooking);
router.put("/cancel-booking/:id", validateToken, cancelBooking);
//  router.put("/delete-booking/:id", validateToken, deleteBooking);

//Admin
router.get("/get-all-booking", validateToken, getAllBooking);

module.exports = router;
