const express = require("express");
const { createUser } = require("../controllers/usercontroller");
const { protect,isAdmin} =require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", createUser);

module.exports = router;