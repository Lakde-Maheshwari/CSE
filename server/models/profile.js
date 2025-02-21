const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Linking to the User model
        required: true,
        unique: true
    },
    bio: {
        type: String,
        trim: true,
        default: ''
    },
    profilePicture: {
        type: String, // URL to the profile picture
        default: ''
    },
    socialLinks: {
        github: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        twitter: { type: String, default: '' }
    },
    achievements: [{
        title: String,
        date: { type: Date, default: Date.now },
        description: String
    }],
    completedTasks: {
        type: Number,
        default: 0
    },
    streak: {
        type: Number,
        default: 0
    },
    rewardPoints: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
