const express = require("express")

const router = express.Router();

router.route("/").get(registerUser);
router.post("/login" , authUser);


module.exports = router;
