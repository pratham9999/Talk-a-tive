const express = require("express");
const { resgisterUser, authUser } = require("../controllers/userControllers");


const router = express.Router();

router.route("/").post(resgisterUser);
router.post("/login" , authUser);


module.exports = router;
