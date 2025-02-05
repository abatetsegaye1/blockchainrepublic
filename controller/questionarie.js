const Questionarie = require("../model/questionarie"); // Correct path

const handleData = async (req, res) => {
    try {
        const { fullName, cityName, zipCode, opinion } = req.body;

        console.log("Input Data:", { fullName, cityName, zipCode, opinion });

        if (!fullName || !cityName || !zipCode || !opinion) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // const trimmedName = fullName.trim();
        // if (trimmedName.length < 3 || trimmedName.length > 70) {
        //     return res
        //         .status(400)
        //         .json({ message: "Name must be between 3 and 70 characters long." });
        // }

        const newQuestionarie = new Questionarie({
            name: fullName,
            cityName: cityName.trim(),
            zipCode: zipCode.trim(),
            answer: opinion.trim(),
        });

        const savedUser = await newQuestionarie.save();

        res.status(201).json(savedUser);
    } catch (err) {
        console.error("Error while saving data:", err); // Log the whole error object!
        res.status(500).json({ 
            message: "Server error while saving data", // User-friendly message
            error: err.message // Detailed error (for development)
        });
    }
};

const getUserData = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const data = await Questionarie.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Questionarie.countDocuments();

        res.status(200).json({
            message: "Data retrieved successfully",
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalEntries: total,
            data
        });

    } catch (err) {
        console.error("Error fetching data:", err); // Log the whole error!
        res.status(500).json({ 
            message: "Server error while fetching data",
            error: err.message
        });
    }
};

module.exports = { handleData, getUserData };