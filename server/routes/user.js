const express = require("express");
const { getUser } = require("../controllers/user.js");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

router.get("/", verifyToken, getUser);

module.exports = router;
