require("dotenv").config(); // Make sure to load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const contactRouter = require("./router/contact"); // Assuming this is your routes file
const mongoose = require("mongoose");
const registerDataRouter = require("./router/registerData");
const userLoginRouter=require("./router/auth");
const User = require("./model/user");

const app = express();

// Port number for your server
const PORT = process.env.PORT || 6001;
 app.use(cors());
// Middleware setup
// app.use(cors({
//     origin: 'http://localhost:5173',  // Adjust this to your frontend URL
//     methods: ['GET', 'POST'], // Adjust if you have other methods
//     allowedHeaders: ['Content-Type'], // Add any headers you need
// }));
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Parse JSON data with a size limit
app.use(helmet()); // Secure your app by setting HTTP headers
app.use(morgan("common")); // Log HTTP requests

// Register the contact routes
app.use("/contact", contactRouter);
// app.use("/que", registerDataRouter);
app.use("/userdata", registerDataRouter);
app.use("/user", userLoginRouter);
app.post("createUser",  async (req, res) => {
      try {
        const {username, password} = req.body;
        const newUser = new User({username,password}); // Create a new User document
        const savedUser = await newUser.save(); // Save the user to the database (this is where the pre('save') middleware runs)
        return savedUser; // Return the saved user object
      } catch (error) {
        console.error("Error creating user:", error);
        // throw error; // Re-throw the error so the calling function can handle it
     return res.status(404).send({message: "database error"});
      }
    }
  
    )
// MongoDB connection
mongoose
  .connect("mongodb+srv://uemglobaladmin:uemglobaladmin@cluster0.g6pup.mongodb.net/blockrep?retryWrites=true&w=majority&appName=Cluster0", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,

  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen("4000", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  });
