const express = require("express");
const handleData = require("../controller/questionarie"); // Assuming this is your handler function
const router = express.Router();

// Define POST route for sending data
router.post("/sendData", handleData);

module.exports = router;

