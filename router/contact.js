const express = require("express");
const handleContact = require("../controller/Contact"); // Assuming this is your handler function
const router = express.Router();

// Define POST route for sending email
router.post("/sendEmail", handleContact);

module.exports = router;
