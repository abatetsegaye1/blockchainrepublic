
const User = require("../model/user");
const bcrypt=require("bcryptjs");
const login =async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: 'Invalid credentials',success:"false",status:"200" });
      const isMatch = await bcrypt.compare(password, user.password);
      
    //   const isMatch = password == user.password;
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials',success:"false",status:"200" });
      res.json({ message: 'Login successful',success:"true",status:"200" });
    } catch (error) {
        console.error(error);
      res.status(500).json({ message: 'Server error' ,success:"false",status:"200"});
    }
  }



  // async function createUser(userData) {
  //   try {
  //     const newUser = new User(userData); // Create a new User document
  //     const savedUser = await newUser.save(); // Save the user to the database (this is where the pre('save') middleware runs)
  //     return savedUser; // Return the saved user object
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //     throw error; // Re-throw the error so the calling function can handle it
  //   }
  // }
  
  // // Example usage:
  // async function test() {
  //     try {
  //         const newUser = await createUser({
  //             username: "republican@admin",
  //             password: "123456" // This will be hashed!
  //         });
  //         console.log("User created:", newUser);
  //     } catch (error) {
  //         console.error("Error in test function:", error);
  //     }
  // }
  
  // test();
  
  module.exports = login;