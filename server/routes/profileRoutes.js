const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Ensure the correct path to your User model
const { authenticateJWT } = require("../middleware/authMiddleware");

// 🟢 Get user profile
router.get("/:userId", authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select("-password"); // Exclude password field
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
});

// 🟠 Update user profile
router.patch("/:userId", authenticateJWT, async (req, res) => {
    try {
        const { name, bio, profilePicture } = req.body; // Acceptable fields to update
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { name, bio, profilePicture },
            { new: true, runValidators: true }
        ).select("-password"); // Exclude password field

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
});

module.exports = router;
