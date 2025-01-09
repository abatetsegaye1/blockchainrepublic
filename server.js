const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const contactRouter = require("./router/contact"); // Assuming this is your routes file
const  mongoose  = require("mongoose");
const registerDataRouter = require("./router/registerData");
require("dotenv").config(); // Make sure to load environment variables

const app = express();

// Port number for your server
const PORT = process.env.PORT || 6001;

// Middleware setup
// app.use(cors({
//     origin: 'http://localhost:5173',  // Adjust this to your frontend URL
//     methods: ['GET', 'POST'], // Adjust if you have other methods
//     allowedHeaders: ['Content-Type'], // Add any headers you need
// }));

// Allow only the frontend origin to access the API
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON data with a size limit
app.use(helmet()); // Secure your app by setting HTTP headers
app.use(morgan("common")); // Log HTTP requests

// Register the contact routes
app.use("/contact", contactRouter);
app.use("/questionarieData", registerDataRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
 
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  });
