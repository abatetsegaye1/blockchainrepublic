const Questionarie = require("../model/questionarie");

const registerData = async (req, res) => {
  try {
    const { fullName, cityName, zipCode, opinion } = req.body;

    // Log the input for debugging purposes
    console.log("Input Data:", { fullName, cityName, zipCode, opinion });

    // Validate required fields
    if (!fullName || !cityName || !zipCode || !opinion) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Trim and validate name length
    const trimmedName = fullName.trim();
    if (trimmedName.length < 3 || trimmedName.length > 70) {
      return res
        .status(400)
        .json({ message: "Name must be between 3 and 70 characters long." });
    }

    // Create a new record
    const newQuestionarie = new Questionarie({
      name: trimmedName,
      cityName: cityName.trim(),
      zipCode: zipCode.trim(),
      answer: opinion.trim(),
    });

    // Save to the database
    const savedUser = await newQuestionarie.save();

    // Respond with the saved record
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error while saving data:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = registerData;
