const express = require("express");
const { registerUser, loginUser, currentUser, getAllUsers, updateUser} = require("../controller/userController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/currentUser", validateToken, currentUser);
router.get("/get-all-users", validateToken, getAllUsers);
router.put("/update-user-data", validateToken, updateUser);

module.exports = router;