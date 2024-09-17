const express = require("express");
const { resgisterUser, authUser , allUsers } = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.route("/").post(resgisterUser);
router.post("/login" , authUser);
router.route("/").get(protect , allUsers)

module.exports = router;
