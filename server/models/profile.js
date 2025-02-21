const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Linking to the User model
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
    
    achievements: [{
        title: String,
        date: { type: Date, default: Date.now },
        description: String
    }],
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
